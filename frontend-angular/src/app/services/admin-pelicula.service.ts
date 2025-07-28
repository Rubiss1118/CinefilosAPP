import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminPelicula {
  id?: number;
  titulo: string;
  director: string;
  genero: string;
  fecha_estreno: string;
  duracion: number;
  sinopsis: string;
  url_imagen: string;
  created_at?: string;
  updated_at?: string;
  resenas?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminPeliculaService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener todas las películas (admin)
  getPeliculas(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/peliculas?page=${page}&per_page=${perPage}`, {
      headers: this.getHeaders()
    });
  }

  // Crear nueva película
  crearPelicula(pelicula: AdminPelicula): Observable<{pelicula: AdminPelicula, message: string}> {
    return this.http.post<{pelicula: AdminPelicula, message: string}>(`${this.apiUrl}/admin/peliculas`, pelicula, {
      headers: this.getHeaders()
    });
  }

  // Actualizar película
  actualizarPelicula(id: number, pelicula: Partial<AdminPelicula>): Observable<{pelicula: AdminPelicula, message: string}> {
    return this.http.put<{pelicula: AdminPelicula, message: string}>(`${this.apiUrl}/admin/peliculas/${id}`, pelicula, {
      headers: this.getHeaders()
    });
  }

  // Eliminar película
  eliminarPelicula(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/admin/peliculas/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Obtener estadísticas de películas
  getEstadisticasPeliculas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/peliculas/estadisticas`, {
      headers: this.getHeaders()
    });
  }
}
