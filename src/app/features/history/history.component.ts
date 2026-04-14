import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../core/store/weather.store';
import { LucideAngularModule, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  store = inject(WeatherStore);
  readonly MapPinIcon = MapPin;

  selectCity(city: string) {
    this.store.setCity(city);
  }

  // Performance: trackBy para otimizar renderização da lista
  trackByCity(index: number, city: string): string {
    return city;
  }
}
