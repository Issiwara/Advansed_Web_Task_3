import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stats } from '../dashboard/user-stats/user-stats';

@Injectable({ providedIn: 'root' })
export class GlobalStatsService {
  private _stats$ = new BehaviorSubject<Stats>(new Stats(42, 7, 13));

  readonly stats$ = this._stats$.asObservable();

  getStats(): Stats {
    return this._stats$.value;
  }

  updateStats(partial: Partial<Stats> | Stats) {
    const current = this._stats$.value;
    const updated: Stats = partial instanceof Stats ? partial : new Stats(
      partial.activeUsers ?? current.activeUsers,
      partial.newMessages ?? current.newMessages,
      partial.projects ?? current.projects
    );
    this._stats$.next(updated);
  }
}
