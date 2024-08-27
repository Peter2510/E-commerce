export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  idCategoria: number;
  idMarca: number;
  imageUrl: string;
}

export interface Marca {
  id?: number;
  nombreMarca: string;
}

export interface categoria {
  id?: number;
  nombreCategoria: string;
}
