import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStats, Stats } from './user-stats';
import { By } from '@angular/platform-browser';

describe('UserStats', () => {
  let component: UserStats;
  let fixture: ComponentFixture<UserStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStats]
    }).compileComponents();

    fixture = TestBed.createComponent(UserStats);
    component = fixture.componentInstance;
    component.stats = new Stats(4, 2, 8); // 4 users, 8 projects => avg 2.0
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render stats and computed values in the HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-stats-card')).toBeTruthy();
    expect(compiled.querySelector('p')?.textContent).toContain('Active users:');
    // verify individual numeric values exist
    expect(compiled.querySelector('.user-stats-card')!.textContent).toContain('4');
    expect(compiled.querySelector('.user-stats-card')!.textContent).toContain('8');
    // check computed average projects per user - formatted with number pipe to 2 decimals
    const avgNode = compiled.querySelector('.summary');
    expect(avgNode?.textContent).toContain('2.00');
  });
});
