import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { PuestosComponent } from './pages/puestos/puestos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DefaultComponent } from './pages/default/default.component';
import { authGuard } from './core/auth.guard';
import { LoginPageComponent } from './core/auth/login/pages/login-page/login-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'default', component: DefaultComponent },
      { path: 'personas', component: PersonasComponent },
      { path: 'puestos', component: PuestosComponent },
      { path: 'contacto', component: ContactoComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

