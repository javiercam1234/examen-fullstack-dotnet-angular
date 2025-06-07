// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Componentes de las rutas
import { LoginPageComponent } from './core/auth/login/pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { PuestosComponent } from './pages/puestos/puestos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';


// Guard para proteger rutas
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Ruta raíz redirige a login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta login pública
  { path: 'login', component: LoginPageComponent },

  // Rutas protegidas bajo home con AuthGuard
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: 'personas', component: PersonasComponent },
      { path: 'puestos', component: PuestosComponent },
      { path: 'contacto', component: ContactoComponent },
      // Si quisieras agregar ruta vacía aquí, por ejemplo:
      // { path: '', redirectTo: 'personas', pathMatch: 'full' },
    ],
  },

  // Ruta comodín para cualquier URL no reconocida, redirige a login
  { path: '**', redirectTo: 'login' },
];
