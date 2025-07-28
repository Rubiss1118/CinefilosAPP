import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-sidebar">
      <div class="admin-header">
        <h2 class="admin-title">Panel de Administración</h2>
      </div>
      <nav class="admin-nav">
        <a routerLink="/admin/usuarios" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">👥</span>
          <span class="nav-text">Gestión de Usuarios</span>
        </a>
        <a routerLink="/admin/peliculas" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">🎬</span>
          <span class="nav-text">Gestión de Películas</span>
        </a>
        <a routerLink="/admin/resenas" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📝</span>
          <span class="nav-text">Gestión de Reseñas</span>
        </a>
      </nav>
      <div class="admin-footer">
        <a routerLink="/bienvenida" class="back-button">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Volver al Inicio</span>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {}
