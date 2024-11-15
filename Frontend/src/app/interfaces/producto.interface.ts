import { inventario } from "./inventario.interface";

export interface Producto {
  id?: number;
  nombre: string;
  //descripcion: string;
  precio: number;
  categoria: categoria;
  marca: Marca;
  url_imagenes: UrlImage[];
  descripcion: string;
  minimoInventario: number;
  activo?: boolean;
  inventario?: inventario;
}

export interface Marca {
  id?: number;
  nombreMarca: string;
  imagen: UrlImage[];
}
export interface categoria {
  id?: number;
  nombreCategoria: string;
  imagen: UrlImage[];
}

export interface UrlImage {
  nombre?: string;
  url: string;
}
