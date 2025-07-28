import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert-overlay" *ngIf="visible" (click)="onBackdropClick()">
      <div class="alert-container" [ngClass]="'alert-' + type" (click)="$event.stopPropagation()">
        <div class="alert-icon">
          <div *ngIf="type === 'success'" class="icon success-icon">✓</div>
          <div *ngIf="type === 'error'" class="icon error-icon">✕</div>
          <div *ngIf="type === 'warning'" class="icon warning-icon">!</div>
          <div *ngIf="type === 'info'" class="icon info-icon">i</div>
        </div>
        <div class="alert-content">
          <h3 class="alert-title">
            <span *ngIf="type === 'success'">¡Éxito!</span>
            <span *ngIf="type === 'error'">Error</span>
            <span *ngIf="type === 'warning'">Advertencia</span>
            <span *ngIf="type === 'info'">Información</span>
          </h3>
          <p class="alert-message">{{ message }}</p>
        </div>
        <div class="alert-actions">
          <button class="alert-button alert-confirm" (click)="confirm()">
            Aceptar
          </button>
          <button *ngIf="type === 'warning'" class="alert-button alert-cancel" (click)="close()">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .alert-container {
      background: linear-gradient(135deg, #252836, #1c1e29);
      border-radius: 16px;
      padding: 25px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: slideIn 0.3s ease-in-out;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .alert-icon {
      margin-bottom: 16px;
    }

    .icon {
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-weight: bold;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .success-icon {
      background-color: #00b894;
      color: white;
    }

    .error-icon {
      background-color: #ff5252;
      color: white;
    }

    .warning-icon {
      background-color: #fdcb6e;
      color: #333;
    }

    .info-icon {
      background-color: #74b9ff;
      color: white;
      font-style: italic;
    }

    .alert-content {
      text-align: center;
      margin-bottom: 20px;
      width: 100%;
    }

    .alert-title {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 10px 0;
      color: white;
    }

    .alert-message {
      color: #e6e6e6;
      font-size: 16px;
      margin: 0;
      line-height: 1.5;
    }

    .alert-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .alert-button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .alert-confirm {
      background-color: #6c5ce7;
      color: white;
    }

    .alert-confirm:hover {
      background-color: #5649c0;
      transform: translateY(-2px);
    }

    .alert-cancel {
      background-color: #393b4a;
      color: #e6e6e6;
    }

    .alert-cancel:hover {
      background-color: #444859;
      transform: translateY(-2px);
    }

    .alert-success .alert-icon {
      color: #00b894;
    }

    .alert-error .alert-icon {
      color: #ff5252;
    }

    .alert-warning .alert-icon {
      color: #fdcb6e;
    }

    .alert-info .alert-icon {
      color: #74b9ff;
    }
  `]
})
export class AlertComponent implements OnInit {
  visible = false;
  message = '';
  type: 'success' | 'error' | 'warning' | 'info' = 'info';

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => {
      this.visible = alert.visible;
      this.message = alert.message;
      this.type = alert.type;
    });
  }

  confirm(): void {
    this.alertService.close(true);
  }

  close(): void {
    this.alertService.close(false);
  }

  onBackdropClick(): void {
    // Solo cerrar si no es una alerta de tipo warning (que requiere confirmación)
    if (this.type !== 'warning') {
      this.alertService.close(false);
    }
  }
}
