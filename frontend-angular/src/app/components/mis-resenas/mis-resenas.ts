import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ResenaService } from '../../services/resena';
import { PeliculaService } from '../../services/pelicula';
import { AlertService } from '../../services/alert.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-mis-resenas',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, Navbar],
  templateUrl: './mis-resenas.html',
  styleUrls: ['./mis-resenas.css']
})
export class MisResenasComponent implements OnInit {
  currentUser: any = null;
  misResenas: any[] = [];
  resenasFiltradas: any[] = [];
  loading = true;
  
  // Filtros
  filtroCalificacion = '';
  filtroPelicula = '';
  
  // Lista de todas las películas para el selector
  todasLasPeliculas: any[] = [];
  
  // Edición
  editandoResena: any = null;
  resenaEditada = {
    calificacion: 5,
    resena: ''
  };

  // Estadísticas
  totalResenas = 0;
  promedioCalificacion = 0;
  mejorCalificacion = 0;
  
  constructor(
    private authService: Auth,
    private resenaService: ResenaService,
    private peliculaService: PeliculaService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserSync();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Cargar la lista de películas para el selector
    this.loadPeliculas();
    
    // Cargar las reseñas del usuario
    this.loadMisResenas();
  }
  
  loadPeliculas() {
    this.peliculaService.getAllPeliculasForSelector().subscribe({
      next: (peliculas: any[]) => {
        this.todasLasPeliculas = peliculas;
      },
      error: (error: any) => {
        console.error('Error cargando películas:', error);
      }
    });
  }

  loadMisResenas() {
    this.loading = true;
    this.resenaService.getMisResenas().subscribe({
      next: (data: any) => {
        this.misResenas = data.resenas || data || [];
        this.resenasFiltradas = [...this.misResenas];
        this.calcularEstadisticas();
        this.loading = false;
        console.log('Mis reseñas cargadas:', this.misResenas);
      },
      error: (error: any) => {
        console.error('Error cargando mis reseñas:', error);
        this.loading = false;
      }
    });
  }

  calcularEstadisticas() {
    this.totalResenas = this.misResenas.length;
    
    if (this.totalResenas > 0) {
      const suma = this.misResenas.reduce((acc, resena) => acc + resena.calificacion, 0);
      this.promedioCalificacion = suma / this.totalResenas;
      this.mejorCalificacion = Math.max(...this.misResenas.map(r => r.calificacion));
    } else {
      this.promedioCalificacion = 0;
      this.mejorCalificacion = 0;
    }
  }

  aplicarFiltros() {
    this.resenasFiltradas = this.misResenas.filter(resena => {
      const cumpleFiltroCalificacion = !this.filtroCalificacion || 
        resena.calificacion.toString() === this.filtroCalificacion;
      
      const cumpleFiltroPelicula = !this.filtroPelicula || 
        resena.pelicula?.id.toString() === this.filtroPelicula;
      
      return cumpleFiltroCalificacion && cumpleFiltroPelicula;
    });
  }

  limpiarFiltros() {
    this.filtroCalificacion = '';
    this.filtroPelicula = '';
    this.resenasFiltradas = [...this.misResenas];
  }

  iniciarEdicion(resena: any) {
    this.editandoResena = resena;
    this.resenaEditada = {
      calificacion: resena.calificacion,
      resena: resena.resena
    };
  }

  cancelarEdicion() {
    this.editandoResena = null;
    this.resenaEditada = {
      calificacion: 5,
      resena: ''
    };
  }

  guardarEdicion() {
    if (!this.resenaEditada.resena.trim()) {
      this.alertService.warning('Por favor, escribe una reseña');
      return;
    }

    this.resenaService.updateResena(this.editandoResena.id, this.resenaEditada).subscribe({
      next: (response: any) => {
        this.alertService.success('Reseña actualizada correctamente');
        this.cancelarEdicion();
        this.loadMisResenas();
      },
      error: (error: any) => {
        console.error('Error actualizando reseña:', error);
        this.alertService.error('Error al actualizar la reseña');
      }
    });
  }

  eliminarResena(resena: any) {
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar tu reseña de "${resena.pelicula?.titulo}"?`)
      .then(confirmado => {
        if (!confirmado) return;
        
        this.resenaService.deleteResena(resena.id).subscribe({
          next: (response: any) => {
            this.alertService.success('Reseña eliminada correctamente');
            this.loadMisResenas();
          },
          error: (error: any) => {
            console.error('Error eliminando reseña:', error);
            this.alertService.error('Error al eliminar la reseña');
          }
        });
      });
  }

  getEstrellas(calificacion: number): string {
    return '⭐'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  verPelicula(peliculaId: number) {
    this.router.navigate(['/peliculas'], { queryParams: { id: peliculaId } });
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
