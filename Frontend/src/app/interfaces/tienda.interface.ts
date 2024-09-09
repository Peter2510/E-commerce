import { UrlImage } from './producto.interface';

export interface tienda {
  id?: number;
  nombre: string;
  direccion: string;
  imagen?: UrlImage;
}
