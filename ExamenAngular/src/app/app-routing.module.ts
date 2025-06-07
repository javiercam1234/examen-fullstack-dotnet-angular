import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { PuestosComponent } from './pages/puestos/puestos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DefaultComponent } from './pages/default/default.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        loadComponent: () => 
          import('./pages/inicio/inicio.component').then(m => m.InicioComponent),
      },
      {
        path: 'default',
        loadComponent: () =>
          import('./pages/default/default.component').then((m) => m.DefaultComponent),
      },

      { path: 'contacto', component: ContactComponent },
      { path: 'personas', component: PersonasComponent },
      { path: 'puestos', component: PuestosComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
