import { Producto } from "./producto.interface";

export class Carrito {
    //id: number | undefined;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    imagenUrl: string;
  
    constructor(
        nombre?: string,
        descripcion?: string,
        precio?: number,
        cantidad?: number,
        imagenUrl?: string,
      ) {
        this.nombre = nombre || '';
        this.descripcion = descripcion || '';
        this.precio = precio || 0;
        this.cantidad = cantidad || 0;
        this.imagenUrl = imagenUrl || '';
      }
  }

  export class ItemCarrito {
    producto?: Producto;
    cantidad: number;
  
    constructor(
        producto?: Producto,
        cantidad?: number,
      ) {
        this.producto = producto ;
        this.cantidad = cantidad || 0;
      }
  }

  export class CarritoCompras {
    itemsCarrito?: ItemCarrito[];
    
  
    constructor(
        itemsCarrito?: ItemCarrito[],

      ) {
        this.itemsCarrito = itemsCarrito ;
      }
    calcularTotal(){
      let total = 0;
      this.itemsCarrito?.forEach(item => {
        total += item.cantidad * (item.producto?.precio ?? 0);
        });
    }
  }