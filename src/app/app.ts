import { Component, signal } from '@angular/core';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStats, Stats } from './dashboard/user-stats/user-stats';
import { GlobalStatsService } from './services/global-stats.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserStats, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnDestroy {
  protected readonly title = signal('my-angular-app');
  protected globalStats: Stats = new Stats(0, 0, 0);
  private readonly sub = new Subscription();

  constructor(private readonly globalStatsService: GlobalStatsService) {
    // subscribe so app updates when global stats update
    this.sub.add(this.globalStatsService.stats$.subscribe((s) => (this.globalStats = s)));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
