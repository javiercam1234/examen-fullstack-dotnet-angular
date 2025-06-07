import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { PuestosComponent } from './pages/puestos/puestos.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DefaultComponent } from './pages/default/default.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
 


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppComponent,    // Standalone
    HomeComponent,   // Standalone
    InicioComponent,  // Standalone
    // PersonasModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule { }