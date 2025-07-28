import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert>({
    type: 'info',
    message: '',
    visible: false
  });

  alert$ = this.alertSubject.asObservable();
  private resolveRef: ((result: boolean) => void) | null = null;

  constructor() {}

  // Método para mostrar una alerta simple
  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    // Cierra cualquier alerta existente antes de mostrar una nueva
    const currentAlert = this.alertSubject.value;
    if (currentAlert.visible) {
      this.close(false);
      
      // Pequeña pausa para que la animación de cierre se complete
      setTimeout(() => {
        this.alertSubject.next({
          type,
          message,
          visible: true
        });
      }, 200);
    } else {
      this.alertSubject.next({
        type,
        message,
        visible: true
      });
    }
  }

  // Método para mostrar una alerta y esperar respuesta
  confirm(message: string): Promise<boolean> {
    this.alertSubject.next({
      type: 'warning',
      message,
      visible: true
    });

    return new Promise<boolean>((resolve) => {
      this.resolveRef = resolve;
    });
  }

  // Métodos de conveniencia
  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  // Método para cerrar la alerta
  close(result: boolean = false): void {
    const currentAlert = this.alertSubject.value;
    this.alertSubject.next({
      ...currentAlert,
      visible: false
    });
    
    if (this.resolveRef) {
      this.resolveRef(result);
      this.resolveRef = null;
    }
  }
}
