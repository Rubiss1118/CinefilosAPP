import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  loading = false;
  error = '';
  showPassword = false; // Nueva propiedad para mostrar/ocultar contraseña

  constructor(private authService: Auth, private router: Router) {}

  // Método para alternar visibilidad de contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/bienvenida']);
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.error = error.error?.message || 'Error de conexión';
          this.loading = false;
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Método para ir a recuperación de contraseña
  goToPasswordRecovery() {
    this.router.navigate(['/password-recovery']);
  }
}
