import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = 'admin';
  password: string = '1234';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        console.log('Respuesta login:', res);
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home/inicio']);
        } else {
          alert('No se recibió token');
        }
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}