import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyForecast } from '../../../../core/models/forecast.model';
import { TemperaturePipe } from '../../../../shared/pipes/temperature.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule, TemperaturePipe, LucideAngularModule],
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss']
})
export class ForecastCardComponent {
  @Input({ required: true }) forecast!: DailyForecast;
  @Input() unit: 'metric' | 'imperial' = 'metric';

  getDayName(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    }

    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date);
  }

  getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
  }

  getWeatherCategory(code: number): string {
    if (code === 0) return 'clear';
    if (code >= 1 && code <= 3) return 'cloudy';
    if (code >= 45 && code <= 48) return 'fog';
    if (code >= 51 && code <= 55) return 'drizzle';
    if (code >= 61 && code <= 65) return 'rain';
    if (code >= 71 && code <= 77) return 'snow';
    if (code >= 80 && code <= 82) return 'rain';
    if (code >= 85 && code <= 86) return 'snow';
    if (code >= 95 && code <= 99) return 'storm';
    return 'unknown';
  }
}
