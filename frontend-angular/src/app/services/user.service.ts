import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  rol: 'admin' | 'cinefilo';
  created_at?: string;
  updated_at?: string;
  resenas?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private authService: Auth
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No authentication token found');
      // Redirigir al login si no hay token
      window.location.href = '/login';
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Obtener todos los usuarios (solo admin)
  getUsuarios(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/usuarios?page=${page}&per_page=${perPage}`, {
      headers: this.getHeaders()
    });
  }

  // Crear nuevo usuario
  crearUsuario(usuario: User): Observable<{usuario: User, message: string}> {
    return this.http.post<{usuario: User, message: string}>(`${this.apiUrl}/admin/usuarios`, usuario, {
      headers: this.getHeaders()
    });
  }

  // Actualizar usuario
  actualizarUsuario(id: number, usuario: Partial<User>): Observable<{usuario: User, message: string}> {
    return this.http.put<{usuario: User, message: string}>(`${this.apiUrl}/admin/usuarios/${id}`, usuario, {
      headers: this.getHeaders()
    });
  }

  // Eliminar usuario
  eliminarUsuario(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/admin/usuarios/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Obtener estadísticas de usuarios
  getEstadisticasUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/usuarios/estadisticas`, {
      headers: this.getHeaders()
    });
  }

  // Validar token antes de hacer peticiones
  private validateToken(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No se encontró token de autenticación');
      window.location.href = '/login';
      return false;
    }
    return true;
  }

  // Método mejorado para eliminar usuario
  eliminarUsuarioSeguro(id: number): Observable<{message: string}> {
    if (!this.validateToken()) {
      throw new Error('Token no válido');
    }

    console.log('Eliminando usuario con ID:', id);
    console.log('Token:', localStorage.getItem('auth_token')?.substring(0, 20) + '...');
    
    return this.eliminarUsuario(id);
  }
}
