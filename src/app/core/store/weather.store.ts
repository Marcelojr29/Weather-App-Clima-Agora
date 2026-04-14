import { Injectable, signal, inject } from "@angular/core";
import { WeatherService } from "../services/weather.service";
import { StorageService } from "../services/storage.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, switchMap, catchError, of, tap } from "rxjs";
import { Weather } from "../models/weather.model";
import { DailyForecast } from "../models/forecast.model";

@Injectable({ providedIn: 'root' })
export class WeatherStore {
  private weatherService = inject(WeatherService);
  private storage = inject(StorageService);

  private selectedCitySubject = new BehaviorSubject<string>('Manaus');
  private unit = signal<'metric' | 'imperial'>('metric'); // ºC ou ºF

  private errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private loadingSignal = signal<boolean>(true);
  readonly loading = this.loadingSignal.asReadonly();

  private searchHistory = signal<string[]>(this.storage.get('history') || []);

  readonly currentWeather = toSignal(
    this.selectedCitySubject.pipe(
      switchMap(city => {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        return this.weatherService.getCurrentWeather(city);
      }),
      tap(() => this.loadingSignal.set(false)),
      catchError(error => {
        console.error('Erro ao buscar clima:', error);
        this.loadingSignal.set(false);
        this.errorSignal.set(error.message || 'Erro ao buscar dados do clima');
        return of(null);
      })
    ),
    { initialValue: null as any }
  );

  readonly dailyForecast = toSignal(
    this.selectedCitySubject.pipe(
      switchMap(city => this.weatherService.getDailyForecast(city)),
      catchError(error => {
        console.error('Erro ao buscar previsão:', error);
        this.loadingSignal.set(false);
        return of([] as DailyForecast[]);
      })
    ),
    { initialValue: [] as DailyForecast[] }
  );

  readonly historyList = this.searchHistory.asReadonly();

  readonly currentUnit = this.unit.asReadonly();

  /**
   * Define a cidade atual e dispara busca reativa
   * @param city Nome da cidade
   */
  setCity(city: string) {
    if (city && city.trim()) {
      this.loadingSignal.set(true);
      this.errorSignal.set(null);
      this.selectedCitySubject.next(city.trim());
      this.addToHistory(city.trim());
    }
  }

  toggleUnit() {
    this.unit.update(u => u === 'metric' ? 'imperial' : 'metric');
  }

  private addToHistory(city: string) {
    this.searchHistory.update(history => {
      const filtered = history.filter(c => c.toLowerCase() !== city.toLowerCase());
      const updated = [city, ...filtered].slice(0, 5); // Mantém últimos 5
      this.storage.save('history', updated);
      return updated;
    });
  }
}
