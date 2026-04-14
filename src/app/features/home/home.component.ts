import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { UnitToggleComponent } from '../../shared/components/unit-toggle/unit-toggle.component';
import { HistoryComponent } from '../history/history.component';
import { WeatherStore } from '../../core/store/weather.store';
import { LucideAngularModule, Sun } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    CurrentWeatherComponent,
    ForecastCardComponent,
    UnitToggleComponent,
    HistoryComponent,
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  store = inject(WeatherStore);
  readonly SunIcon = Sun;

  // Performance: trackBy para ngFor do forecast
  trackByDate(index: number, item: any): string {
    return item.date.toString();
  }
}
