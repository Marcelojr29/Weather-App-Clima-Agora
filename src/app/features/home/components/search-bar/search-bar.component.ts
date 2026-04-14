import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherStore } from '../../../../core/store/weather.store';
import { WeatherService } from '../../../../core/services/weather.service';
import { GeocodingResult } from '../../../../core/models/weather.model';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  readonly SearchIcon = Search;
  private store = inject(WeatherStore);
  private weatherService = inject(WeatherService);

  searchQuery = signal('');
  showSuggestions = signal(false);
  private searchSubject = new Subject<string>();

  // Converte o Observable de autocomplete para Signal
  suggestions = toSignal(
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query =>
        query.length >= 2
          ? this.weatherService.searchCities(query, 5).pipe(
              catchError(() => of([] as GeocodingResult[]))
            )
          : of([] as GeocodingResult[])
      )
    ),
    { initialValue: [] as GeocodingResult[] }
  );

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchQuery.set(value);
    this.showSuggestions.set(true);
    this.searchSubject.next(value);
  }

  selectCity(city: GeocodingResult) {
    const cityName = `${city.name}${city.admin1 ? ', ' + city.admin1 : ''}, ${city.country}`;
    this.searchQuery.set(city.name);
    this.showSuggestions.set(false);
    this.store.setCity(city.name);
  }

  onSearch() {
    const query = this.searchQuery();
    if (query.trim()) {
      this.store.setCity(query.trim());
      this.showSuggestions.set(false);
    }
  }

  closeSuggestions() {
    setTimeout(() => this.showSuggestions.set(false), 200);
  }
}
