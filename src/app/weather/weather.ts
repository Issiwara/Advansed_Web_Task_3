import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { OpenMeteoResponse, CurrentWeather } from '../services/weather.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="weather-section">
      <h2>Weather</h2>
      <p>Current weather data from Open-Meteo API (Berlin).</p>

      <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="weather && !loading" class="weather-card">
        <div class="weather-info">
          <div class="temperature">{{ weather.current_weather?.temperature }}°C</div>
          <div class="location">Latitude: {{ weather.latitude }}, Longitude: {{ weather.longitude }}</div>
          <div class="timezone">Timezone: {{ weather.timezone }}</div>
          <div class="time">Time: {{ weather.current_weather?.time }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `.weather-section { max-width: 500px; margin: 2rem auto; padding: 1rem; }`,
    `.weather-section h2 { color: #33006b; margin: 0 0 0.25rem 0; }`,
    `.weather-card { background: linear-gradient(90deg,#fff,#fbf7ff); padding: 1rem; border-radius:8px; border:1px solid rgba(0,0,0,0.04); }`,
    `.temperature { font-size:2rem; font-weight:700; color:#ff6b00; }`,
    `.location, .timezone, .time { color:#444; font-size:0.95rem; margin-top:0.25rem; }`,
    `.loading { color:#666; }`,
    `.error { color:#FF0060; font-weight:600; }`
  ]
})
export class Weather implements OnInit, OnDestroy {
    weather?: OpenMeteoResponse | null;
    loading = false;
    error: string | null = null;
    private sub?: Subscription;

    constructor(private svc: WeatherService) {}

    ngOnInit() {
      this.loading = true;
      this.sub = this.svc.getCurrentWeather(52.52, 13.405).subscribe({
        next: (w) => {
          this.weather = w;
          this.loading = false;
        },
        error: (err) => {
          this.error = String(err);
          this.loading = false;
        }
      });
    }

    ngOnDestroy() {
      this.sub?.unsubscribe();
    }
  }