import { Routes } from '@angular/router';
import { MyDashboard } from './dashboard/my-dashboard/my-dashboard';
import { Home } from './home/home';
import { Entities } from './entities/entities';
import { Login } from './login/login';
import { Weather } from './weather/weather';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: Home },
	{ path: 'dashboard', component: MyDashboard },
	{ path: 'entities', component: Entities },
	{ path: 'login', component: Login },
	{ path: 'weather', component: Weather },
	{ path: '**', redirectTo: 'home' },
];
