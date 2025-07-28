import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { BienvenidaComponent } from './components/bienvenida/bienvenida';
import { PeliculasComponent } from './components/peliculas/peliculas';
import { MisResenasComponent } from './components/mis-resenas/mis-resenas';
import { AdminUsuariosComponent } from './components/admin-usuarios/admin-usuarios';
import { AdminPeliculasComponent } from './components/admin-peliculas/admin-peliculas.component';
import { AdminResenasComponent } from './components/admin-resenas/admin-resenas.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'mis-resenas', component: MisResenasComponent },
  
  // Rutas de administración con layout
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'usuarios', component: AdminUsuariosComponent },
      { path: 'peliculas', component: AdminPeliculasComponent },
      { path: 'resenas', component: AdminResenasComponent },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  },
  
  { path: '**', redirectTo: '/login' }
];
