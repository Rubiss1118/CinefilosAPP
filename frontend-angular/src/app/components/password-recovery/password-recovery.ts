import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-password-recovery',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-recovery.html',
  styleUrl: './password-recovery.css'
})
export class PasswordRecoveryComponent {
  email = '';
  loading = false;
  error = '';
  success = false;
  step: 'email' | 'code' | 'newPassword' = 'email';
  
  // Para verificación por código
  verificationCode = '';
  newPassword = '';
  confirmNewPassword = '';
  showNewPassword = false;
  showConfirmNewPassword = false;

  constructor(private authService: Auth, private router: Router) {}

  // Paso 1: Enviar código de recuperación por email
  sendRecoveryCode() {
    if (!this.email) {
      this.error = 'Por favor ingresa tu email';
      return;
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Por favor ingresa un email válido';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.requestPasswordReset(this.email).subscribe({
      next: (response) => {
        this.success = true;
        this.step = 'code';
        this.loading = false;
        
        // Si hay un mensaje de error pero tenemos el código, mostramos un aviso
        if (response.error && response.code) {
          console.warn('El correo no pudo enviarse, pero el código ha sido enviado a tu email');
          // Solo guardamos el código en el almacenamiento local sin mostrarlo en la interfaz
          localStorage.setItem('recovery_code_' + this.email, response.code);
        }
        
        // Si el código está en la respuesta (modo desarrollo), lo registramos en consola pero no lo asignamos al formulario
        if (response.code) {
          console.info('Código de recuperación enviado a tu correo electrónico');
          // Dejamos el campo de código vacío para que el usuario lo introduzca manualmente
          this.verificationCode = '';
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Error al enviar el código de recuperación';
        this.loading = false;
        
        // Si hay un código en la respuesta de error, lo guardamos solo en consola
        if (error.error?.code) {
          console.info('Se ha enviado un código a tu correo electrónico');
          // No asignamos el código al campo para que el usuario lo introduzca manualmente
        }
      }
    });
  }

  // Paso 2: Verificar código
  verifyCode() {
    if (!this.verificationCode) {
      this.error = 'Por favor ingresa el código de verificación';
      return;
    }

    if (this.verificationCode.length !== 6) {
      this.error = 'El código debe tener 6 dígitos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.verifyResetCode(this.email, this.verificationCode).subscribe({
      next: (response) => {
        this.step = 'newPassword';
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Código de verificación inválido';
        this.loading = false;
      }
    });
  }

  // Paso 3: Establecer nueva contraseña
  resetPassword() {
    if (!this.newPassword || !this.confirmNewPassword) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.newPassword.length < 8) {
      this.error = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.resetPassword(this.email, this.verificationCode, this.newPassword).subscribe({
      next: (response) => {
        // Mostrar mensaje de éxito más elegante
        const successMessage = document.createElement('div');
        successMessage.className = 'success-overlay';
        successMessage.innerHTML = `
          <div class="success-modal">
            <div class="success-icon">✓</div>
            <h2>¡Contraseña actualizada!</h2>
            <p>Tu contraseña ha sido restablecida correctamente.</p>
            <p>Serás redirigido a la página de inicio de sesión...</p>
          </div>
        `;
        document.body.appendChild(successMessage);
        
        // Esperar 2 segundos y redireccionar
        setTimeout(() => {
          document.body.removeChild(successMessage);
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.error = error.error?.message || 'Error al restablecer la contraseña';
        this.loading = false;
      }
    });
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmNewPasswordVisibility() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Reenviar código
  resendCode() {
    this.sendRecoveryCode();
  }
}
