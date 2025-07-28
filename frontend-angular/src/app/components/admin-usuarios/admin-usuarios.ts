import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.html',
  styleUrls: ['./admin-usuarios.css']
})
export class AdminUsuariosComponent implements OnInit {
  Math = Math; // Para usar en el template
  usuarios: User[] = [];
  usuariosFiltrados: User[] = [];
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
  selectedUsuario: User | null = null;

  // Form data
  formData: User = {
    name: '',
    email: '',
    password: '',
    rol: 'cinefilo'
  };

  // Filtros
  filtroRol = '';
  filtroBusqueda = '';

  // Confirmación de eliminación
  showDeleteConfirm = false;
  usuarioToDelete: User | null = null;

  // Estadísticas
  estadisticas = {
    total_usuarios: 0,
    total_admins: 0,
    total_cinefilos: 0,
    usuarios_recientes: 0
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarEstadisticas();
  }

  cargarUsuarios() {
    this.loading = true;
    this.error = '';
    
    this.userService.getUsuarios(this.currentPage, this.perPage).subscribe({
      next: (response) => {
        this.usuarios = response.data;
        this.usuariosFiltrados = response.data;
        this.totalItems = response.total;
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        console.log('Token actual:', localStorage.getItem('auth_token'));
        
        if (error.status === 401) {
          this.error = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          this.error = 'Error al cargar usuarios: ' + (error.error?.message || 'Error desconocido');
        }
        
        this.loading = false;
      }
    });
  }

  cargarEstadisticas() {
    this.userService.getEstadisticasUsuarios().subscribe({
      next: (stats) => {
        this.estadisticas = stats;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }

  aplicarFiltros() {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const matchRol = !this.filtroRol || usuario.rol === this.filtroRol;
      const matchBusqueda = !this.filtroBusqueda || 
        usuario.name.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.filtroBusqueda.toLowerCase());
      
      return matchRol && matchBusqueda;
    });
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  // Modal functions
  openCreateModal() {
    this.modalMode = 'create';
    this.formData = {
      name: '',
      email: '',
      password: '',
      rol: 'cinefilo'
    };
    this.showModal = true;
    this.error = '';
    this.success = '';
  }

  openEditModal(usuario: User) {
    this.modalMode = 'edit';
    this.selectedUsuario = usuario;
    this.formData = {
      name: usuario.name,
      email: usuario.email,
      password: '',
      rol: usuario.rol
    };
    this.showModal = true;
    this.error = '';
    this.success = '';
  }

  closeModal() {
    this.showModal = false;
    this.selectedUsuario = null;
    this.formData = {
      name: '',
      email: '',
      password: '',
      rol: 'cinefilo'
    };
  }

  submitForm() {
    if (!this.formData.name || !this.formData.email || !this.formData.rol) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    if (this.modalMode === 'create' && !this.formData.password) {
      this.error = 'La contraseña es obligatoria para crear usuario';
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.modalMode === 'create') {
      this.userService.crearUsuario(this.formData).subscribe({
        next: (response) => {
          this.success = response.message;
          this.loading = false;
          this.closeModal();
          this.cargarUsuarios();
          this.cargarEstadisticas();
        },
        error: (error) => {
          this.error = error.error?.message || 'Error al crear usuario';
          this.loading = false;
        }
      });
    } else if (this.selectedUsuario) {
      const updateData = { ...this.formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      this.userService.actualizarUsuario(this.selectedUsuario.id!, updateData).subscribe({
        next: (response) => {
          this.success = response.message;
          this.loading = false;
          this.closeModal();
          this.cargarUsuarios();
        },
        error: (error) => {
          this.error = error.error?.message || 'Error al actualizar usuario';
          this.loading = false;
        }
      });
    }
  }

  // Delete functions
  openDeleteConfirm(usuario: User) {
    this.usuarioToDelete = usuario;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.usuarioToDelete = null;
  }

  confirmarEliminar() {
    if (!this.usuarioToDelete) return;

    this.loading = true;
    this.userService.eliminarUsuarioSeguro(this.usuarioToDelete.id!).subscribe({
      next: (response) => {
        this.success = response.message;
        this.loading = false;
        this.closeDeleteConfirm();
        this.cargarUsuarios();
        this.cargarEstadisticas();
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
        console.log('Token actual:', localStorage.getItem('auth_token'));
        
        if (error.status === 401) {
          this.error = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          this.error = error.error?.message || 'Error al eliminar usuario';
        }
        
        this.loading = false;
        this.closeDeleteConfirm();
      }
    });
  }

  getRoleBadgeClass(rol: string): string {
    return rol === 'admin' ? 'badge-admin' : 'badge-cinefilo';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }

  // Métodos de paginación
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarUsuarios();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarUsuarios();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cargarUsuarios();
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  // Navegar al inicio
  volverAlInicio() {
    this.router.navigate(['/bienvenida']);
  }
}
