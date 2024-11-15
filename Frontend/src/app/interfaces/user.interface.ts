import { Person } from './person.interface';

export class User {
  id: number | undefined;
  nombreUsuario: string;
  contrasenia: string;
  persona: Person | undefined;
  activo: boolean;
  a2fActivo: boolean;
  idTipoUsuario: number;

  constructor(
    id?: number,
    nombreUsuario?: string,
    contrasenia?: string,
    persona?: Person,
    activo?: boolean,
    idTipoUsuario?: number
  ) {
    this.nombreUsuario = nombreUsuario || '';
    this.contrasenia = contrasenia || '';
    this.persona = persona;
    this.activo = activo || true;
    this.idTipoUsuario = idTipoUsuario || 0;
    this.a2fActivo = false;
  }
}

// INTERFAZ PARA LOS TIPOS DE USUARIO
export interface tipoUsuario {
  id: number;
  tipo: string;
}
