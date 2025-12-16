import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export class Stats {
  constructor(
    public activeUsers: number = 0,
    public newMessages: number = 0,
    public projects: number = 0
  ) {}
}

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-stats.html',
  styleUrls: ['./user-stats.scss'],
})
export class UserStats {
  @Input() stats: Stats = new Stats();

  // Computation: average projects per user
  get projectsPerUser(): number {
    return this.stats.activeUsers ? this.stats.projects / this.stats.activeUsers : 0;
  }

  // A simple formatted summary to demonstrate expression evaluation
  get summary(): string {
    const avg = this.projectsPerUser;
    return `${this.stats.activeUsers} users · ${this.stats.projects} projects · avg ${avg.toFixed(2)} projects/user`;
  }
}
