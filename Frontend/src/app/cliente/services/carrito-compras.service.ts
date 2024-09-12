import { Injectable } from '@angular/core';
import { CarritoCompras, ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  carrito: CarritoCompras;
  total: number = 0;

  constructor() {
    // Recupera el carrito desde localStorage o inicialízalo si no existe
    const carritoGuardado = localStorage.getItem('miCarrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : { itemsCarrito: [] }; // Asegúrate de que este sea el formato correcto para tu `CarritoCompras`
  }

  private guardarCarrito() {
    localStorage.setItem('miCarrito', JSON.stringify(this.carrito));
  }

  limpiarCarrito(){
    this.carrito.itemsCarrito = [];
  
    this.guardarCarrito();
  }

  agregarItem(producto: Producto, cantidad: number): void {
    // Asegúrate de que itemsCarrito esté inicializado
    if (!this.carrito.itemsCarrito) {
      this.carrito.itemsCarrito = [];
    }

    // Verifica si el producto ya está en el carrito
    const itemExistente = this.carrito.itemsCarrito.find(item => item.producto?.id === producto.id);
    if (itemExistente) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      itemExistente.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      const itemCarrito = new ItemCarrito(producto, cantidad);
      this.carrito.itemsCarrito.push(itemCarrito);
    }
    
    // Guarda el carrito en localStorage
    this.guardarCarrito();
  }

  getTotal(): number {
    console.log('hola que hace')

    this.total= this.carrito.itemsCarrito!.reduce((total, item) => 
      total + ((item.producto?.precio ?? 0) * item.cantidad), 
      0);
    return this.total;
  }

  guardarCambios(items: ItemCarrito[]){
    this.carrito.itemsCarrito=items;
    //this.cantidadMayor();
    this.guardarCarrito();
  }

  cantidadMayor(){
    this.carrito.itemsCarrito!.forEach(element => {
      if(element.producto?.inventario?.cantidadtotal!<=element.cantidad){
        element.cantidad=element.producto?.inventario?.cantidadtotal!;
        alert('Cantidad insuficiente')
        Swal.fire({
          title: 'Producto insuficiente',
          text: `${element.producto} solo hay en existencias ${element.producto?.inventario?.cantidadtotal!}`,
          icon: 'error'
        });
        return false
      }
      return true;
    });
    return true;
  }

  existeEnCarrito(producto: Producto): boolean{
    if (!this.carrito.itemsCarrito) {
      this.carrito.itemsCarrito = [];
    }
    const itemExistente = this.carrito.itemsCarrito.find(item => item.producto?.id === producto.id);
    if (itemExistente) {
      return true;
    } else {
      return false
    }

  }

  getCarrito(): CarritoCompras {
    return this.carrito;
  }

  tieneItems(): boolean {
    // Verifica si el array de itemsCarrito está definido y si tiene elementos
    return !!(this.carrito.itemsCarrito && this.carrito.itemsCarrito.length > 0);
  }
  

  getProductosPedido(){
    //const productos = this.carrito.itemsCarrito!.map(item => item.producto?.id, item.cantidad);
    const productos = this.carrito.itemsCarrito!.map(item => ({
      id: item.producto?.id,
      cantidad: item.cantidad
    }));
    return productos;
    
  }

  getCantidadItems():number{
    return this.carrito.itemsCarrito!.length
  }

  eliminarItem(productoId: number): void {
    // Filtra el carrito para eliminar el ítem con el id especificado
    this.carrito.itemsCarrito = this.carrito.itemsCarrito!.filter(item => item.producto!.id !== productoId);
    this.guardarCarrito();
  }
}
