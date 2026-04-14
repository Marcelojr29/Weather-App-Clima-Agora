import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';
import { Weather, GeocodingResponse, GeocodingResult, WeatherCodes } from '../models/weather.model';
import { DailyForecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);

  private readonly WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
  private readonly GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  /**
   * Busca coordenadas de uma cidade pelo nome
   * @param city Nome da cidade
   * @returns Observable com resultado de geocoding
   */
  private getCoordinates(city: string): Observable<GeocodingResult> {
    const params = new HttpParams()
      .set('name', city)
      .set('count', '1')
      .set('language', 'pt')
      .set('format', 'json');

    return this.http.get<GeocodingResponse>(this.GEOCODING_URL, { params })
      .pipe(
        map(response => {
          if (!response.results || response.results.length === 0) {
            throw new Error('Cidade não encontrada');
          }
          return response.results[0];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Busca o clima atual de uma cidade
   * @param city Nome da cidade
   * @returns Observable com os dados do clima atual
   */
  getCurrentWeather(city: string): Observable<Weather> {
    return this.getCoordinates(city).pipe(
      switchMap(location => {
        const params = new HttpParams()
          .set('latitude', location.latitude.toString())
          .set('longitude', location.longitude.toString())
          .set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code')
          .set('timezone', 'auto');

        return this.http.get<Weather>(this.WEATHER_URL, { params }).pipe(
          map(weather => ({
            ...weather,
            // Adiciona informações da cidade ao objeto
            cityName: location.name,
            country: location.country,
            admin1: location.admin1
          } as any)),
          retry(2),
          catchError(this.handleError)
        );
      })
    );
  }

  /**
   * Busca a previsão de 7 dias para uma cidade
   * @param city Nome da cidade
   * @returns Observable com a previsão diária
   */
  getDailyForecast(city: string): Observable<DailyForecast[]> {
    return this.getCoordinates(city).pipe(
      switchMap(location => {
        const params = new HttpParams()
          .set('latitude', location.latitude.toString())
          .set('longitude', location.longitude.toString())
          .set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
          .set('timezone', 'auto')
          .set('forecast_days', '7');

        return this.http.get<Weather>(this.WEATHER_URL, { params }).pipe(
          map(response => this.processDailyForecast(response)),
          retry(2),
          catchError(this.handleError)
        );
      })
    );
  }

  /**
   * Procura cidades por nome para autocomplete
   * @param query Texto de busca
   * @param limit Número máximo de resultados (padrão: 5)
   * @returns Observable com array de resultados de geocoding
   */
  searchCities(query: string, limit: number = 5): Observable<GeocodingResult[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    const params = new HttpParams()
      .set('name', query)
      .set('count', limit.toString())
      .set('language', 'pt')
      .set('format', 'json');

    return this.http.get<GeocodingResponse>(this.GEOCODING_URL, { params })
      .pipe(
        map(response => response.results || []),
        catchError(() => of([]))
      );
  }

  /**
   * Processa a previsão diária da API
   * @param weather Resposta da API
   * @returns Array de previsões diárias
   */
  private processDailyForecast(weather: Weather): DailyForecast[] {
    if (!weather.daily) {
      return [];
    }

    const forecasts: DailyForecast[] = [];
    const { time, temperature_2m_max, temperature_2m_min, weather_code } = weather.daily;

    for (let i = 0; i < Math.min(time.length, 7); i++) {
      const code = weather_code[i];
      const weatherInfo = WeatherCodes[code] || WeatherCodes[0];

      forecasts.push({
        date: new Date(time[i]),
        tempMax: temperature_2m_max[i],
        tempMin: temperature_2m_min[i],
        weatherCode: code,
        description: weatherInfo.description,
        icon: weatherInfo.icon
      });
    }

    return forecasts;
  }

  /**
   * Tratamento centralizado de erros HTTP
   * @param error Erro HTTP
   * @returns Observable com erro tratado
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = 'Cidade não encontrada';
          break;
        case 400:
          errorMessage = 'Requisição inválida';
          break;
        case 429:
          errorMessage = 'Muitas requisições. Tente novamente mais tarde.';
          break;
        case 0:
          errorMessage = 'Sem conexão com a internet';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }

    console.error('Erro na requisição:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
