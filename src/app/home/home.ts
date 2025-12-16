import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="home-container"><h2>Home</h2><p>Welcome to the Home page.</p></div>`,
  styles: [
    `.home-container { padding: 0.5rem; } .home-container h2 { margin: 0; }`
  ]
})
export class Home {}
