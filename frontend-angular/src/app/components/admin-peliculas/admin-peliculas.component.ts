import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminPeliculaService, AdminPelicula } from '../../services/admin-pelicula.service';

@Component({
  selector: 'app-admin-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.css']
})
export class AdminPeliculasComponent implements OnInit {
  Math = Math; // Para usar en el template
  
  peliculas: AdminPelicula[] = [];
  peliculasFiltradas: AdminPelicula[] = [];
  loading = false;
  error = '';
  success = '';

  // Paginación
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  totalItems = 0;

  // Modal states
  showModal = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedPelicula: AdminPelicula | null = null;

  // Form data
  formData: AdminPelicula = {
    titulo: '',
    director: '',
    genero: '',
    fecha_estreno: '',
    duracion: 0,
    sinopsis: '',
    url_imagen: ''
  };

  // Filtros
  filtroGenero = '';
  filtroBusqueda = '';

  // Confirmación de eliminación
  showDeleteConfirm = false;
  peliculaToDelete: AdminPelicula | null = null;

  // Géneros disponibles
  generos = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Crimen', 'Terror', 'Ciencia Ficción',
    'Fantasía', 'Romance', 'Thriller', 'Musical', 'Animación', 'Documental'
  ];

  constructor(
    private adminPeliculaService: AdminPeliculaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPeliculas();
  }
  
  // Función para extraer todos los géneros únicos de las películas
  actualizarGeneros() {
    const generosSet = new Set<string>();
    
    // Añadir los géneros predefinidos
    this.generos.forEach(g => generosSet.add(g));
    
    // Extraer géneros de las películas
    this.peliculas.forEach(pelicula => {
      if (pelicula.genero) {
        // Dividir géneros combinados (ej: "Drama/Crimen" → ["Drama", "Crimen"])
        const generosIndividuales = pelicula.genero.split(/[\/\,\&]+/).map(g => g.trim());
        generosIndividuales.forEach(g => {
          if (g) generosSet.add(g);
        });
      }
    });
    
    // Actualizar la lista de géneros ordenados alfabéticamente
    this.generos = Array.from(generosSet).sort();
    console.log('Géneros disponibles:', this.generos);
  }

  cargarPeliculas() {
    this.loading = true;
    this.error = '';
    
    console.log('Cargando películas...');
    
    this.adminPeliculaService.getPeliculas(this.currentPage, this.perPage).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        
        this.peliculas = response.data || response.peliculas || [];
        this.totalItems = response.total || this.peliculas.length;
        this.totalPages = response.last_page || 1;
        this.currentPage = response.current_page || 1;
        
        console.log('Películas cargadas:', this.peliculas.length);
        console.log('Total items:', this.totalItems);
        console.log('Total pages:', this.totalPages);
        
        // Actualizar la lista de géneros disponibles
        this.actualizarGeneros();
        
        this.aplicarFiltros();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        if (error.status === 401) {
          this.error = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.error = 'Error al cargar películas: ' + (error.error?.message || 'Error desconocido');
        }
        this.loading = false;
      }
    });
  }

  aplicarFiltros() {
    console.log('Aplicando filtros...');
    console.log('Películas antes del filtro:', this.peliculas.length);
    console.log('Filtro género aplicado:', this.filtroGenero);
    
    this.peliculasFiltradas = this.peliculas.filter(pelicula => {
      // Buscar coincidencia parcial en género (ej: "Acción" en "Acción/Drama")
      const matchGenero = !this.filtroGenero || 
                          (pelicula.genero && 
                           pelicula.genero.toLowerCase().includes(this.filtroGenero.toLowerCase()));
                          
      const matchBusqueda = !this.filtroBusqueda || 
        pelicula.titulo.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        pelicula.director.toLowerCase().includes(this.filtroBusqueda.toLowerCase());
      
      if (this.filtroGenero && pelicula.genero) {
        console.log(`Película: ${pelicula.titulo}, Género: ${pelicula.genero}, Coincide: ${matchGenero}`);
      }
      
      return matchGenero && matchBusqueda;
    });
    
    console.log('Películas después del filtro:', this.peliculasFiltradas.length);
  }

  onFiltroChange() {
    console.log(`Filtro cambiado - Género: "${this.filtroGenero}", Búsqueda: "${this.filtroBusqueda}"`);
    this.aplicarFiltros();
  }

  // Modal functions
  openCreateModal() {
    this.modalMode = 'create';
    this.formData = {
      titulo: '',
      director: '',
      genero: '',
      fecha_estreno: '',
      duracion: 0,
      sinopsis: '',
      url_imagen: ''
    };
    this.showModal = true;
    this.error = '';
    this.success = '';
  }

  openEditModal(pelicula: AdminPelicula) {
    this.modalMode = 'edit';
    this.selectedPelicula = pelicula;
    this.formData = { ...pelicula };
    this.showModal = true;
    this.error = '';
    this.success = '';
  }

  closeModal() {
    this.showModal = false;
    this.selectedPelicula = null;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      titulo: '',
      director: '',
      genero: '',
      fecha_estreno: '',
      duracion: 0,
      sinopsis: '',
      url_imagen: ''
    };
  }

  submitForm() {
    if (!this.formData.titulo || !this.formData.director || !this.formData.genero || 
        !this.formData.fecha_estreno || !this.formData.duracion || !this.formData.sinopsis) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    if (this.formData.duracion <= 0) {
      this.error = 'La duración debe ser mayor a 0';
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.modalMode === 'create') {
      this.adminPeliculaService.crearPelicula(this.formData).subscribe({
        next: (response) => {
          this.success = response.message;
          this.loading = false;
          this.closeModal();
          this.cargarPeliculas();
        },
        error: (error) => {
          this.error = error.error?.message || 'Error al crear película';
          this.loading = false;
        }
      });
    } else if (this.selectedPelicula) {
      this.adminPeliculaService.actualizarPelicula(this.selectedPelicula.id!, this.formData).subscribe({
        next: (response) => {
          this.success = response.message;
          this.loading = false;
          this.closeModal();
          this.cargarPeliculas();
        },
        error: (error) => {
          this.error = error.error?.message || 'Error al actualizar película';
          this.loading = false;
        }
      });
    }
  }

  // Delete functions
  openDeleteConfirm(pelicula: AdminPelicula) {
    this.peliculaToDelete = pelicula;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.peliculaToDelete = null;
  }

  confirmarEliminar() {
    if (!this.peliculaToDelete) return;

    this.loading = true;
    this.adminPeliculaService.eliminarPelicula(this.peliculaToDelete.id!).subscribe({
      next: (response) => {
        this.success = response.message;
        this.loading = false;
        this.closeDeleteConfirm();
        this.cargarPeliculas();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error al eliminar película';
        this.loading = false;
        this.closeDeleteConfirm();
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }

  getResenaCount(pelicula: AdminPelicula): number {
    return pelicula.resenas?.length || 0;
  }

  // Métodos de paginación
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarPeliculas();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarPeliculas();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cargarPeliculas();
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  // Navegar al inicio
  volverAlInicio() {
    this.router.navigate(['/bienvenida']);
  }

  // Métodos simplificados para el comportamiento del select
  onSelectFocus(event: FocusEvent): void {
    // Dejar que el navegador maneje el dropdown normalmente
    const select = event.target as HTMLSelectElement;
    select.style.borderColor = '#a855f7';
  }

  onSelectBlur(event: FocusEvent): void {
    // Restaurar el estilo normal
    const select = event.target as HTMLSelectElement;
    select.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  }
}
