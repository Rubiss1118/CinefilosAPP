import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminResenaService, AdminResena } from '../../services/admin-resena.service';
import { CensuraService } from '../../services/censura.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-admin-resenas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-resenas.component.html',
  styleUrls: ['./admin-resenas.component.css']
})
export class AdminResenasComponent implements OnInit {
  Math = Math; // Para usar en el template
  
  resenas: AdminResena[] = [];
  resenasFiltradas: AdminResena[] = [];
  loading = false;
  error = '';
  success = '';

  // Paginación
  currentPage = 1;  
  totalPages = 1;
  itemsPerPage = 10;
  totalItems = 0;

  // Filtros
  filtroCalificacion = '';
  filtroPelicula = '';
  filtroUsuario = '';

  // Confirmación de eliminación
  showDeleteConfirm = false;
  resenaToDelete: AdminResena | null = null;

  // Listas para filtros
  peliculas: string[] = [];
  usuarios: string[] = [];

  constructor(
    private adminResenaService: AdminResenaService,
    private censuraService: CensuraService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    this.error = '';

    // Cargar películas para filtros
    this.adminResenaService.getAllMovies().subscribe({
      next: (response) => {
        // Manejar diferentes formatos de respuesta
        let peliculasList: any[] = [];
        
        if (response.data && Array.isArray(response.data)) {
          peliculasList = response.data;
        } else if (response.peliculas && Array.isArray(response.peliculas)) {
          peliculasList = response.peliculas;
        } else if (Array.isArray(response)) {
          peliculasList = response;
        }
        
        // Crear array de strings de títulos
        const titulos: string[] = [];
        peliculasList.forEach(pelicula => {
          if (pelicula && pelicula.titulo) {
            titulos.push(pelicula.titulo);
          }
        });
        
        // Eliminar duplicados y ordenar
        this.peliculas = [...new Set(titulos)].sort();
        console.log('Películas cargadas:', this.peliculas.length);
        
        this.cargarUsuarios();
      },
      error: (error) => {
        this.manejarError(error);
      }
    });
  }

  cargarUsuarios() {
    this.adminResenaService.getAllUsers().subscribe({
      next: (response) => {
        // Manejar diferentes formatos de respuesta
        let usuariosList: any[] = [];
        
        if (response.data && Array.isArray(response.data)) {
          usuariosList = response.data;
        } else if (response.usuarios && Array.isArray(response.usuarios)) {
          usuariosList = response.usuarios;
        } else if (Array.isArray(response)) {
          usuariosList = response;
        }
        
        // Crear array de strings de nombres de usuario
        const nombres: string[] = [];
        usuariosList.forEach(usuario => {
          if (usuario && usuario.name) {
            nombres.push(usuario.name);
          }
        });
        
        // Eliminar duplicados y ordenar
        this.usuarios = [...new Set(nombres)].sort();
        console.log('Usuarios cargados:', this.usuarios.length);
        
        this.cargarResenas();
      },
      error: (error) => {
        this.manejarError(error);
      }
    });
  }

  manejarError(error: any) {
    if (error.status === 401) {
      this.error = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.error = 'Error al cargar datos: ' + (error.error?.message || 'Error desconocido');
    }
    this.loading = false;
  }

  cargarResenas() {
    this.loading = true;
    this.error = '';

    this.adminResenaService.getResenas(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.resenas = response.data || [];
        this.totalItems = response.total || this.resenas.length;
        this.totalPages = response.last_page || Math.ceil(this.totalItems / this.itemsPerPage);
        this.currentPage = response.current_page || this.currentPage;
        
        this.aplicarFiltros();
        this.loading = false;
      },
      error: (error) => {
        this.manejarError(error);
      }
    });
  }

  censurarResena(resena: AdminResena) {
    if (!resena.resena) return;
    
    const textoOriginal = resena.resena;
    const textoCensurado = this.censuraService.censurarTexto(textoOriginal);
    
    // Verificar si se realizó algún cambio
    if (textoOriginal === textoCensurado) {
      this.alertService.info('No se encontraron palabras inapropiadas en esta reseña.');
      return;
    }

    this.loading = true;
    this.error = '';
    
    console.log('Texto original:', textoOriginal);
    console.log('Texto censurado:', textoCensurado);
    
    // Eliminamos campos innecesarios que podrían causar problemas
    const datosActualizados = {
      calificacion: resena.calificacion,
      resena: textoCensurado
    };

    this.adminResenaService.actualizarResena(resena.id!, datosActualizados).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        
        // Verificar si la reseña en la respuesta tiene el texto censurado
        if (response && response.resena && response.resena.resena === textoCensurado) {
          this.alertService.success('¡Reseña censurada exitosamente! Las palabras inapropiadas han sido reemplazadas por asteriscos.');
        } else {
          this.alertService.warning('La censura se aplicó pero puede que no se haya guardado correctamente. Intente recargar la página.');
          console.warn('La reseña devuelta por el servidor no coincide con el texto censurado:', 
            response?.resena?.resena, 'vs', textoCensurado);
        }
        
        // Actualizar la reseña en las listas locales inmediatamente
        const index = this.resenas.findIndex(r => r.id === resena.id);
        if (index !== -1) {
          // Actualizar la reseña en la lista principal
          this.resenas[index] = {
            ...this.resenas[index],
            resena: textoCensurado
          };
        }

        // Actualizar también en la lista filtrada
        const indexFiltrado = this.resenasFiltradas.findIndex(r => r.id === resena.id);
        if (indexFiltrado !== -1) {
          this.resenasFiltradas[indexFiltrado] = {
            ...this.resenasFiltradas[indexFiltrado],
            resena: textoCensurado
          };
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al censurar:', error);
        this.alertService.error('Error al censurar la reseña: ' + (error.error?.message || 'Ha ocurrido un error inesperado'));
        this.loading = false;
      }
    });
  }

  generarListasFiltros() {
    this.peliculas = [...new Set(this.resenas.map(r => r.pelicula?.titulo || '').filter(t => t))].sort();
    this.usuarios = [...new Set(this.resenas.map(r => r.usuario?.name || '').filter(n => n))].sort();
  }

  aplicarFiltros() {
    this.resenasFiltradas = this.resenas.filter(resena => {
      const matchCalificacion = !this.filtroCalificacion || resena.calificacion.toString() === this.filtroCalificacion;
      const matchPelicula = !this.filtroPelicula || resena.pelicula?.titulo === this.filtroPelicula;
      const matchUsuario = !this.filtroUsuario || resena.usuario?.name === this.filtroUsuario;
      return matchCalificacion && matchPelicula && matchUsuario;
    });
  }

  onFiltroChange() {
    console.log('Filtro aplicado:', {
      pelicula: this.filtroPelicula,
      usuario: this.filtroUsuario,
      calificacion: this.filtroCalificacion
    });
    
    // Asegurarnos que los selectores vuelvan a su estado normal
    const selectElements = document.querySelectorAll('select.filter-select');
    selectElements.forEach(select => {
      (select as HTMLSelectElement).size = 1;
      select.classList.remove('select-expanded');
    });
    
    this.aplicarFiltros();
  }

  // Paginación
  irAPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPages) return;
    this.currentPage = pagina;
    this.cargarResenas();
  }

  paginaAnterior() {
    if (this.currentPage > 1) {
      this.irAPagina(this.currentPage - 1);
    }
  }

  paginaSiguiente() {
    if (this.currentPage < this.totalPages) {
      this.irAPagina(this.currentPage + 1);
    }
  }

  getPaginasVisibles(): number[] {
    const totalVisible = 5;
    let inicio = Math.max(1, this.currentPage - Math.floor(totalVisible / 2));
    let fin = Math.min(this.totalPages, inicio + totalVisible - 1);
    
    if (fin - inicio + 1 < totalVisible) {
      inicio = Math.max(1, fin - totalVisible + 1);
    }
    
    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  // Delete functions
  openDeleteConfirm(resena: AdminResena) {
    this.resenaToDelete = resena;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.resenaToDelete = null;
  }

  confirmarEliminar() {
    if (!this.resenaToDelete) return;

    this.loading = true;
    this.adminResenaService.eliminarResena(this.resenaToDelete.id!).subscribe({
      next: (response) => {
        this.success = response.message;
        this.loading = false;
        this.closeDeleteConfirm();
        this.cargarResenas();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error al eliminar reseña';
        this.loading = false;
        this.closeDeleteConfirm();
      }
    });
  }

  // Navigation
  volverAlInicio() {
    this.router.navigate(['/bienvenida']);
  }

  // Utility functions
  getPromedioCalificacion(): number {
    if (this.resenas.length === 0) return 0;
    const total = this.resenas.reduce((sum, resena) => sum + resena.calificacion, 0);
    return Math.round((total / this.resenas.length) * 10) / 10;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStars(calificacion: number): string {
    return '⭐'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
  }

  getRoleBadgeClass(rol: string): string {
    return rol === 'admin' ? 'badge-admin' : 'badge-cinefilo';
  }

  truncateComment(comment: string, maxLength: number = 100): string {
    if (!comment) return '';
    if (comment.length <= maxLength) return comment;
    return comment.substring(0, maxLength) + '...';
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
