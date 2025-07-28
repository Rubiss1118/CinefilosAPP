export interface User {
  id: number;
  name: string;
  email: string;
  rol: 'admin' | 'cinefilo';
  created_at: string;
  updated_at: string;
  resenas?: Resena[];
}

export interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  genero: string;
  fecha_estreno: string;
  duracion: number;
  sinopsis: string;
  url_imagen: string;
  calificacion_promedio?: number;
  total_resenas?: number;
  resenas?: Resena[];
  created_at: string;
  updated_at: string;
}

export interface Resena {
  id: number;
  pelicula_id: number;
  usuario_id: number;
  calificacion: number;
  resena: string;
  created_at: string;
  updated_at: string;
  pelicula?: Pelicula;
  usuario?: User;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  password_plain?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  rol?: 'admin' | 'cinefilo';
}
