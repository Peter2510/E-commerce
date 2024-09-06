export class Person {
  id?: number | undefined;
  nombre: string;
  correoElectronico: string;
  direccion: string;
  idTipoFormaPago: number | string;
  nit: string;
  fechaCreacion?: string;
  ultimoInicioSesion?: string;

  constructor(
    nombre?: string,
    correoElectronico?: string,
    direccion?: string,
    idTipoFormaPago?: string,
    nit?: string,
    fechaCreacion?: string,
    ultimoInicioSesion?: string
  ) {
    this.nombre = nombre || '';
    this.correoElectronico = correoElectronico || '';
    this.direccion = direccion || '';
    this.idTipoFormaPago = idTipoFormaPago || '';
    this.nit = nit || '';
    this.fechaCreacion = fechaCreacion || '';
    this.ultimoInicioSesion = ultimoInicioSesion || '';
  }
}

export interface formaPago {
  id?: number;
  tipo: string;
}
