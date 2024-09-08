import { ItemCarrito } from "./cliente.interface";

export interface Pedido {
    idUsuario: number;
    nit: string;
    direccionEntrega: string;
    idFormaEntrega: number;
    productos: ItemCarrito[];
  }