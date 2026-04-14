import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../../core/store/weather.store';

@Component({
  selector: 'app-unit-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-toggle.component.html',
  styleUrls: ['./unit-toggle.component.scss']
})
export class UnitToggleComponent {
  store = inject(WeatherStore);

  toggleUnit() {
    this.store.toggleUnit();
  }
}
