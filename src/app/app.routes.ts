import { Routes } from '@angular/router';
import { ContatosComponent } from './features/contatos/contatos.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contatos', pathMatch: 'full' },
  { path: 'contatos', component: ContatosComponent },
  { path: 'dashboard', component: DashboardComponent }
];