export interface Person {
  id?: number;
  nombre: string;
  correoElectronico: string;
  direccion: string;
  idTipoFormaPago: string | number;
  nit: string;
}

export interface formaPago {
  id?: number;
  tipo: string;
}
