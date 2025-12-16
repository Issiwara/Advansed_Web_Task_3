import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from './app.routes';
import { App } from './app';
import { Home } from './home/home';
import { MyDashboard } from './dashboard/my-dashboard/my-dashboard';
import { UserStats } from './dashboard/user-stats/user-stats';
import { By } from '@angular/platform-browser';

describe('App routing', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), App]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(App);
    router.initialNavigation();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should navigate programmatically to /dashboard and render', async () => {
    await router.navigate(['/dashboard']);
    fixture.detectChanges();
    expect(location.path()).toBe('/dashboard');
    const content = fixture.nativeElement as HTMLElement;
    expect(content.querySelector('h2')?.textContent).toContain('Welcome to My Dashboard');
  });

  it('clicking nav links navigates to home', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a.nav-link') as HTMLAnchorElement; // first link should be Home
    expect(homeLink?.textContent).toContain('Home');
    homeLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(location.path()).toBe('/home');
    expect(compiled.querySelector('h2')?.textContent).toContain('Home');
  });
});
