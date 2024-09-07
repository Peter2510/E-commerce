import { UrlImage } from './producto.interface';

export interface tienda {
  id?: number;
  nombre: string;
  direcion: string;
  imagen: UrlImage;
}
