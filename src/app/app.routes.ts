import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

/**
 * Configuração de rotas
 * Demonstra: Routing, Lazy Loading (preparado para futuras features)
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
