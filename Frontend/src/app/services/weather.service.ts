import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Weather } from './models';

/**
 * Holt das aktuelle Wetter für Salzburg von der Open-Meteo-API
 * (kostenlos, kein API-Key nötig). Im Backend gibt es dafür keinen Endpoint,
 * deshalb sprechen wir direkt mit dem öffentlichen Wetter-Service.
 */
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  private readonly _weather = signal<Weather | null>(null);
  private readonly _loading = signal<boolean>(false);

  readonly weather = this._weather.asReadonly();
  readonly loading = this._loading.asReadonly();

  /** Salzburg, AT — passt zum default `ort` im Backend. */
  private readonly LAT = 47.8095;
  private readonly LON = 13.055;
  private readonly LOCATION_NAME = 'Salzburg';

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this._loading.set(true);
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${this.LAT}&longitude=${this.LON}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
      `&timezone=auto`;

    this.http.get<OpenMeteoResponse>(url).subscribe({
      next: (res) => {
        const c = res.current;
        this._weather.set({
          temperature: Math.round(c.temperature_2m),
          feelsLike: Math.round(c.apparent_temperature),
          humidity: Math.round(c.relative_humidity_2m),
          windSpeed: Math.round(c.wind_speed_10m),
          condition: this.codeToCondition(c.weather_code),
          icon: this.codeToIcon(c.weather_code),
          locationName: this.LOCATION_NAME,
          updatedAt: new Date().toISOString(),
        });
        this._loading.set(false);
      },
      error: (err) => {
        console.error('[WeatherService] Failed to load weather', err);
        this._loading.set(false);
      },
    });
  }

  // Mapping der WMO-Wettercodes auf Text + Emoji
  // https://open-meteo.com/en/docs (Abschnitt "Weather variable documentation")
  private codeToCondition(code: number): string {
    if (code === 0) return 'Klar';
    if (code <= 2) return 'Heiter';
    if (code === 3) return 'Bewölkt';
    if (code <= 48) return 'Nebel';
    if (code <= 57) return 'Nieselregen';
    if (code <= 67) return 'Regen';
    if (code <= 77) return 'Schnee';
    if (code <= 82) return 'Regenschauer';
    if (code <= 86) return 'Schneeschauer';
    if (code <= 99) return 'Gewitter';
    return 'Unbekannt';
  }

  private codeToIcon(code: number): string {
    if (code === 0) return '☀️';
    if (code <= 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code <= 48) return '🌫️';
    if (code <= 57) return '🌦️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌦️';
    if (code <= 86) return '🌨️';
    if (code <= 99) return '⛈️';
    return '❓';
  }
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}
