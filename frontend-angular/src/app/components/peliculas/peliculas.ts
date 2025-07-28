import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { PeliculaService } from '../../services/pelicula';
import { ResenaService } from '../../services/resena';
import { AlertService } from '../../services/alert.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, Navbar],
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css', './pagination.css']
})
export class PeliculasComponent implements OnInit {
  currentUser: any = null;
  peliculas: any[] = [];
  peliculasFiltradas: any[] = [];
  loading = true;
  searchTerm = '';
  selectedPelicula: any = null;
  showResenaForm = false;
  
  // Formulario de reseña
  nuevaResena = {
    calificacion: 5,
    resena: ''
  };

  // Paginación
  currentPage = 1;
  totalPages = 5; // Siempre tendremos 5 páginas
  itemsPerPage = 10; // 10 películas por página
  totalItems = 50; // Máximo de 50 películas en total
  searchMode = false;
  lastSearchTerm = '';
  searchTimeout: any = null;
  
  constructor(
    private authService: Auth,
    private peliculaService: PeliculaService,
    private resenaService: ResenaService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserSync();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadPeliculas();
  }

  loadPeliculas() {
    this.loading = true;
    this.peliculaService.getPeliculas(this.currentPage, this.itemsPerPage, this.searchMode ? this.searchTerm : '').subscribe({
      next: (data: any) => {
        // La API devuelve { peliculas: [...] }
        this.peliculas = data.peliculas || [];
        this.aplicarFiltros(); // Aplicar filtros después de cargar
        this.totalItems = data.total || this.peliculas.length;
        this.totalPages = data.total_paginas || Math.ceil(this.totalItems / this.itemsPerPage);
        this.currentPage = data.pagina_actual || this.currentPage;
        this.totalPages = data.last_page || this.totalPages;
        this.loading = false;
        
        // Si no hay resultados en modo búsqueda pero hay término de búsqueda, mostrar mensaje
        if (this.searchMode && this.peliculas.length === 0 && this.searchTerm.trim() !== '') {
          console.log('No se encontraron películas para la búsqueda:', this.searchTerm);
        } else {
          console.log('Películas cargadas:', this.peliculas.length, 'de', this.totalItems);
        }
      },
      error: (error: any) => {
        console.error('Error cargando películas:', error);
        this.loading = false;
      }
    });
  }

  searchPeliculas() {
    // Cancelar cualquier búsqueda pendiente
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    // Si el término de búsqueda está vacío y estábamos en modo búsqueda, volver a cargar todo
    if (!this.searchTerm.trim() && this.searchMode) {
      this.searchMode = false;
      this.currentPage = 1; // Volver a la primera página
      this.loadPeliculas();
      return;
    }
    
    // Si el término de búsqueda está vacío, aplicar filtros directamente sin recargar
    if (!this.searchTerm.trim()) {
      this.aplicarFiltros();
      return;
    }
    
    // Si el término no ha cambiado, no hacer nada
    if (this.searchTerm.trim() === this.lastSearchTerm) {
      return;
    }
    
    // Esperar 300ms antes de ejecutar la búsqueda (debounce)
    this.searchTimeout = setTimeout(() => {
      this.lastSearchTerm = this.searchTerm.trim();
      
      // Si hay término de búsqueda, activar modo búsqueda
      if (this.lastSearchTerm !== '') {
        this.searchMode = true;
        this.currentPage = 1; // Volver a la primera página
      }
      
      // Cargar películas con el filtro de búsqueda
      this.loadPeliculas();
    }, 300);
  }

  aplicarFiltros() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostrar todas las películas
      this.peliculasFiltradas = [...this.peliculas];
    } else {
      // Aplicar filtro de búsqueda en el frontend también (doble filtrado)
      const termino = this.searchTerm.toLowerCase().trim();
      this.peliculasFiltradas = this.peliculas.filter(pelicula => 
        pelicula.titulo?.toLowerCase().includes(termino) ||
        pelicula.director?.toLowerCase().includes(termino) ||
        pelicula.genero?.toLowerCase().includes(termino)
      );
    }
    console.log(`Filtros aplicados: ${this.peliculasFiltradas.length} de ${this.peliculas.length} películas`);
  }

  verDetalle(pelicula: any) {
    this.selectedPelicula = pelicula;
    this.loadResenasPelicula(pelicula.id);
  }

  loadResenasPelicula(peliculaId: number) {
    this.peliculaService.getResenasPelicula(peliculaId).subscribe({
      next: (data: any) => {
        this.selectedPelicula.resenas = data.data || data;
      },
      error: (error: any) => {
        console.error('Error cargando reseñas:', error);
        this.selectedPelicula.resenas = [];
      }
    });
  }

  cerrarDetalle() {
    this.selectedPelicula = null;
    this.showResenaForm = false;
    this.resetFormulario();
  }

  mostrarFormularioResena() {
    this.showResenaForm = true;
  }

  enviarResena() {
    if (!this.nuevaResena.resena.trim()) {
      this.alertService.warning('Por favor, escribe una reseña');
      return;
    }

    const resenaData = {
      pelicula_id: this.selectedPelicula.id,
      calificacion: this.nuevaResena.calificacion,
      resena: this.nuevaResena.resena
    };

    this.resenaService.createResena(resenaData).subscribe({
      next: (response: any) => {
        this.alertService.success('Reseña enviada correctamente');
        this.showResenaForm = false;
        this.resetFormulario();
        this.loadResenasPelicula(this.selectedPelicula.id);
      },
      error: (error: any) => {
        console.error('Error enviando reseña:', error);
        this.alertService.error('Error al enviar la reseña: ' + (error.error?.message || 'Ocurrió un error inesperado'));
      }
    });
  }

  resetFormulario() {
    this.nuevaResena = {
      calificacion: 5,
      resena: ''
    };
  }

  getEstrellas(calificacion: number): string {
    return '⭐'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
  }

  getRoundedRating(rating: number): number {
    return Math.round(rating);
  }

  getPromedioCalificacion(resenas: any[]): string {
    if (!resenas || resenas.length === 0) return '0.0';
    const suma = resenas.reduce((acc, resena) => acc + resena.calificacion, 0);
    return (suma / resenas.length).toFixed(1);
  }

  // Funciones de paginación
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadPeliculas();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
  
  getPaginasVisibles(): number[] {
    // Como solo tenemos 5 páginas, mostramos todas directamente
    return [1, 2, 3, 4, 5];
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error al cerrar sesión:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}
