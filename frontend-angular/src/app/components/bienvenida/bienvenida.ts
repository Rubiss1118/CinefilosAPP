import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ResenaService } from '../../services/resena';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule, DatePipe, Navbar],
  templateUrl: './bienvenida.html',
  styleUrls: ['./bienvenida.css']
})
export class BienvenidaComponent implements OnInit {
  currentUser: any = null;
  misResenas: any[] = [];
  resenasBuenas: any[] = [];
  loading = true;

  constructor(
    private authService: Auth,
    private resenaService: ResenaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  isAdmin(): boolean {
    return this.currentUser?.rol === 'admin';
  }

  loadUserData() {
    this.currentUser = this.authService.getCurrentUserSync();
    
    if (this.currentUser) {
      // Cargar reseñas del usuario
      this.resenaService.getMisResenas().subscribe({
        next: (data: any) => {
          this.misResenas = data.resenas || data;
          this.resenasBuenas = this.misResenas.filter((r: any) => r.calificacion >= 4);
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error cargando reseñas:', error);
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  get promedioCalificacion(): string {
    if (this.misResenas.length === 0) return '0';
    const suma = this.misResenas.reduce((acc, resena) => acc + resena.calificacion, 0);
    return (suma / this.misResenas.length).toFixed(1);
  }

  getEstrellas(calificacion: number): string {
    return '⭐'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
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
        // Forzar logout local aunque falle el servidor
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}
