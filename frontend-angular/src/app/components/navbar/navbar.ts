import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { User } from '../../models/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  currentUser: User | null = null;
  isMenuOpen = false;

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  isCinefilo(): boolean {
    return this.auth.isCinefilo();
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        window.location.href = '/login';
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        // Forzar logout local si hay error
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    });
  }
}
