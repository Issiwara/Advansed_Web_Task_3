import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStats, Stats } from '../user-stats/user-stats';
import { GlobalStatsService } from '../../services/global-stats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-dashboard',
  standalone: true,
  imports: [CommonModule, UserStats],
  templateUrl: './my-dashboard.html',
  styleUrls: ['./my-dashboard.scss'],
})
export class MyDashboard implements OnDestroy {
  // typed property of class Stats
  protected dashboardStats: Stats = new Stats(0, 0, 0);
  private readonly sub = new Subscription();

  constructor(private readonly globalStatsService: GlobalStatsService) {
    // subscribe to global stats so the dashboard updates when service updates
    this.sub.add(this.globalStatsService.stats$.subscribe((s) => (this.dashboardStats = s)));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  increaseProjects(): void {
    const current = this.dashboardStats;
    this.globalStatsService.updateStats({ projects: current.projects + 1 });
  }

}
