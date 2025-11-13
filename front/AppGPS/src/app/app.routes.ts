import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Welcome } from './pages/welcome/welcome';
import { Register } from './pages/register/register';
import { EntrarOrganizacao } from './pages/entrar-organizacao/entrar-organizacao';
import { RegisterOrganizacao } from './pages/register-organizacao/register-organizacao';
import { Dashboard } from './pages/dashboard/dashboard';
import { GPS } from './pages/gps/gps'
import { Dispositivo } from './pages/dispositivo/dispositivo';


export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: Welcome },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'organizacao', component:EntrarOrganizacao},
  { path: 'registerOrganizacao', component:RegisterOrganizacao},
  { path: 'dashboard', component:Dashboard},
  { path: 'gps', component:GPS},
  { path: 'dispositivo', component:Dispositivo}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
