import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminResena {
  id?: number;
  usuario_id: number;
  pelicula_id: number;
  calificacion: number;
  resena: string;  // Cambiado de 'comentario' a 'resena'
  created_at?: string;
  updated_at?: string;
  usuario?: {
    id: number;
    name: string;
    email: string;
    rol: string;
  };
  pelicula?: {
    id: number;
    titulo: string;
    director: string;
    genero: string;
    url_imagen: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminResenaService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener todas las reseñas (admin)
  getResenas(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/resenas?page=${page}&per_page=${perPage}`, {
      headers: this.getHeaders()
    });
  }

  // Obtener reseña específica
  getResena(id: number): Observable<{resena: AdminResena}> {
    return this.http.get<{resena: AdminResena}>(`${this.apiUrl}/admin/resenas/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Actualizar reseña (admin)
  actualizarResena(id: number, resena: Partial<AdminResena>): Observable<{resena: AdminResena, message: string}> {
    return this.http.put<{resena: AdminResena, message: string}>(`${this.apiUrl}/admin/resenas/${id}`, resena, {
      headers: this.getHeaders()
    });
  }

  // Eliminar reseña
  eliminarResena(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/admin/resenas/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Obtener estadísticas de reseñas
  getEstadisticasResenas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/resenas/estadisticas`, {
      headers: this.getHeaders()
    });
  }

  // Obtener todos los usuarios para filtros
  getAllUsers(): Observable<any> {
    // Usamos un tamaño de página muy grande para obtener todos los registros
    return this.http.get(`${this.apiUrl}/admin/usuarios?per_page=9999`, {
      headers: this.getHeaders()
    });
  }

  // Obtener todas las películas para filtros
  getAllMovies(): Observable<any> {
    // Usamos un tamaño de página muy grande para obtener todos los registros
    return this.http.get(`${this.apiUrl}/admin/peliculas?per_page=9999`, {
      headers: this.getHeaders()
    });
  }
}
