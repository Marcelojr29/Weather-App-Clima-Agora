// Resposta do clima atual e previsão
export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeather;
  hourly_units?: HourlyUnits;
  hourly?: HourlyWeather;
  daily_units?: DailyUnits;
  daily?: DailyWeather;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  wind_speed_10m: string;
  weather_code: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

// Modelo para a resposta da API de Geocoding da Open-Meteo
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  Snowflake, 
  CloudLightning,
  HelpCircle,
  LucideIconData
} from 'lucide-angular';

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

// Códigos de clima da WMO (World Meteorological Organization)
export const WeatherCodes: { [key: number]: { description: string; icon: LucideIconData } } = {
  0: { description: 'Céu limpo', icon: Sun },
  1: { description: 'Principalmente limpo', icon: CloudSun },
  2: { description: 'Parcialmente nublado', icon: Cloud },
  3: { description: 'Nublado', icon: Cloud },
  45: { description: 'Nevoeiro', icon: CloudFog },
  48: { description: 'Nevoeiro com geada', icon: CloudFog },
  51: { description: 'Garoa leve', icon: CloudDrizzle },
  53: { description: 'Garoa moderada', icon: CloudDrizzle },
  55: { description: 'Garoa densa', icon: CloudDrizzle },
  61: { description: 'Chuva leve', icon: CloudRain },
  63: { description: 'Chuva moderada', icon: CloudRain },
  65: { description: 'Chuva forte', icon: CloudRain },
  71: { description: 'Neve leve', icon: CloudSnow },
  73: { description: 'Neve moderada', icon: CloudSnow },
  75: { description: 'Neve forte', icon: Snowflake },
  77: { description: 'Grãos de neve', icon: CloudSnow },
  80: { description: 'Pancadas de chuva leves', icon: CloudRain },
  81: { description: 'Pancadas de chuva moderadas', icon: CloudLightning },
  82: { description: 'Pancadas de chuva fortes', icon: CloudLightning },
  85: { description: 'Pancadas de neve leves', icon: CloudSnow },
  86: { description: 'Pancadas de neve fortes', icon: Snowflake },
  95: { description: 'Tempestade', icon: CloudLightning },
  96: { description: 'Tempestade com granizo leve', icon: CloudLightning },
  99: { description: 'Tempestade com granizo forte', icon: CloudLightning }
};
