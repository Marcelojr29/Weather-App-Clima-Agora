import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../../../core/store/weather.store';
import { TemperaturePipe } from '../../../../shared/pipes/temperature.pipe';
import { WeatherCodes } from '../../../../core/models/weather.model';
import { LucideAngularModule, Thermometer, Droplet, Wind, AlertCircle, RotateCw } from 'lucide-angular';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, TemperaturePipe, LucideAngularModule],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  store = inject(WeatherStore);
  weatherCodes = WeatherCodes;

  readonly ThermometerIcon = Thermometer;
  readonly DropletIcon = Droplet;
  readonly WindIcon = Wind;
  readonly AlertCircleIcon = AlertCircle;
  readonly RotateCwIcon = RotateCw;

  getWeatherInfo(code: number) {
    return this.weatherCodes[code] || { description: 'Desconhecido', icon: this.AlertCircleIcon };
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
