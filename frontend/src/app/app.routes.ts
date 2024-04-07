import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeComponent } from './me/me.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FoodComponent } from './food/food.component';

export const routes: Routes = [
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'me', component: MeComponent },
   { path: 'projects', component: ProjectsComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'food', component: FoodComponent },
];
