import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener reseñas del usuario autenticado
  getMisResenas(): Observable<{ resenas: Resena[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ resenas: Resena[] }>(`${this.apiUrl}/mis-resenas`, { headers });
  }

  // Obtener todas las reseñas (solo admin)
  getAllResenas(): Observable<{ resenas: Resena[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ resenas: Resena[] }>(`${this.apiUrl}/admin/resenas`, { headers });
  }

  // Crear reseña
  createResena(resena: { pelicula_id: number; calificacion: number; resena: string }): Observable<{ message: string; resena: Resena }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ message: string; resena: Resena }>(`${this.apiUrl}/resenas`, resena, { headers });
  }

  // Obtener reseña específica
  getResena(id: number): Observable<{ resena: Resena }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ resena: Resena }>(`${this.apiUrl}/resenas/${id}`, { headers });
  }

  // Actualizar reseña
  updateResena(id: number, resena: { calificacion?: number; resena?: string }): Observable<{ message: string; resena: Resena }> {
    const headers = this.getAuthHeaders();
    return this.http.put<{ message: string; resena: Resena }>(`${this.apiUrl}/resenas/${id}`, resena, { headers });
  }

  // Eliminar reseña
  deleteResena(id: number): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/resenas/${id}`, { headers });
  }
}
