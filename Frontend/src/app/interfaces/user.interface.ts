import { Person } from './person.interface';
export interface User {
  id?: number;
  nombreUsuario: string;
  contrasenia: string;
  persona: Person | undefined;
  activo: boolean;
  idTipoUsuario: number;
}

// INTERFAZ PARA LOS TIPOS DE USUARIO
export interface tipoUsuario {
  id: number;
  tipo: string;
}
