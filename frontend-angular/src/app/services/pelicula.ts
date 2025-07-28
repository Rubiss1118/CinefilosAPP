import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula as PeliculaModel } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Ya no necesitamos imágenes aleatorias porque ahora se guardan en la base de datos
  private imagenPorDefecto = '/assets/no-image.jpg';
  
  getImagenPorDefecto(): string {
    return this.imagenPorDefecto;
  }

  // Obtener todas las películas (público)
  getPeliculas(pagina: number = 1, porPagina: number = 10, busqueda: string = ''): Observable<any> {
    return new Observable(observer => {
      // Construir URL con parámetros de paginación y búsqueda
      let url = `${this.apiUrl}/peliculas?page=${pagina}&per_page=${porPagina}`;
      if (busqueda && busqueda.trim() !== '') {
        url += `&busqueda=${encodeURIComponent(busqueda.trim())}`;
      }
      
      this.http.get<any>(url).subscribe({
        next: (response) => {
          const peliculas = response.peliculas || response;
          // Mantener la URL de imagen original pero asegurar que haya una imagen disponible
          const peliculasConImagenes = peliculas.map((pelicula: any) => ({
            ...pelicula,
            url_imagen: pelicula.url_imagen || this.getImagenPorDefecto()
          }));
          
          // Configuramos para 50 películas en total, 10 por página (5 páginas)
          const maxTotal = 50; // Total máximo de películas
          const total = Math.min(response.total || peliculasConImagenes.length, maxTotal);
          const totalPaginas = 5; // Número fijo de páginas
          const paginaActual = pagina;
          
          // Aseguramos que se muestren exactamente 10 películas por página
          const inicio = (pagina - 1) * porPagina;
          const fin = inicio + porPagina;
          const peliculasPaginadas = peliculasConImagenes.slice(inicio, Math.min(fin, peliculasConImagenes.length));
          
          observer.next({
            peliculas: peliculasPaginadas,
            total: total,
            pagina_actual: paginaActual,
            total_paginas: totalPaginas,
            last_page: totalPaginas
          });
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  // Obtener una película específica (público)
  getPelicula(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/peliculas/${id}`);
  }

  // Obtener reseñas paginadas de una película
  getResenasPelicula(id: number, page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/peliculas/${id}/resenas?page=${page}&per_page=${perPage}`);
  }

  // Crear película (solo admin)
  createPelicula(pelicula: Partial<PeliculaModel>): Observable<{ message: string; pelicula: PeliculaModel }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ message: string; pelicula: PeliculaModel }>(`${this.apiUrl}/peliculas`, pelicula, { headers });
  }

  // Actualizar película (solo admin)
  updatePelicula(id: number, pelicula: Partial<PeliculaModel>): Observable<{ message: string; pelicula: PeliculaModel }> {
    const headers = this.getAuthHeaders();
    return this.http.put<{ message: string; pelicula: PeliculaModel }>(`${this.apiUrl}/peliculas/${id}`, pelicula, { headers });
  }

  // Eliminar película (solo admin)
  deletePelicula(id: number): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/peliculas/${id}`, { headers });
  }
  
  // Obtener todas las películas para selectores (sin paginación)
  getAllPeliculasForSelector(): Observable<any[]> {
    return new Observable(observer => {
      this.http.get<any>(`${this.apiUrl}/peliculas?per_page=100`).subscribe({
        next: (response) => {
          const peliculas = response.peliculas || response;
          observer.next(peliculas);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }
}
