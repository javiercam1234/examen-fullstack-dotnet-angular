// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  horaActual: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarHora();
    setInterval(() => this.actualizarHora(), 1000); // Actualiza cada segundo
  }

  actualizarHora() {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}