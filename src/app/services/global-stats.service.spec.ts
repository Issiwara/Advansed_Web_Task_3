import { TestBed } from '@angular/core/testing';
import { GlobalStatsService } from './global-stats.service';
import { Stats } from '../dashboard/user-stats/user-stats';

describe('GlobalStatsService', () => {
  let service: GlobalStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStatsService);
  });

  it('should be created and return defaults', () => {
    expect(service).toBeTruthy();
    const stats = service.getStats();
    expect(stats).toBeTruthy();
    expect(stats instanceof Stats).toBe(true);
  });

  it('should update stats through updateStats and emit', () => {
    const initial = service.getStats();
    const updatedProjects = initial.projects + 5;
    let emitted: Stats | undefined;
    const sub = service.stats$.subscribe((s) => (emitted = s));
    service.updateStats({ projects: updatedProjects });
    expect(emitted?.projects).toBe(updatedProjects);
    sub.unsubscribe();
  });
});
