import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDashboard } from './my-dashboard';
import { GlobalStatsService } from '../../services/global-stats.service';
import { Stats } from '../user-stats/user-stats';
import { By } from '@angular/platform-browser';

describe('MyDashboard', () => {
  let component: MyDashboard;
  let fixture: ComponentFixture<MyDashboard>;
  let globalService: GlobalStatsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDashboard);
    component = fixture.componentInstance;
    globalService = TestBed.inject(GlobalStatsService);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect service stats in template and increase projects via button', async () => {
    // ensure dashboard displays initial numbers from the service
    const stat = globalService.getStats();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.stat-card')?.textContent).toContain(String(stat.activeUsers));

    // click the button and check that the projects count increased
    const before = globalService.getStats().projects;
    const addBtn = fixture.debugElement.query(By.css('.action-btn'));
    addBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    const after = globalService.getStats().projects;
    expect(after).toBe(before + 1);
  });
});
