// Modelo simplificado para exibir previsão diária
import { LucideIconData } from 'lucide-angular';

export interface DailyForecast {
  date: Date;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  description: string;
  icon: LucideIconData;
}
