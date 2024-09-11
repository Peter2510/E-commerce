import { Component, OnInit } from '@angular/core';
import { Carrito, CarritoCompras, ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { CarritoComprasService } from '../../services/carrito-compras.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-carrito-de-compras',
  templateUrl: './carrito-de-compras.component.html',
  styleUrls: ['./carrito-de-compras.component.css']
})
export class CarritoDeComprasComponent implements OnInit {
  carrito!: CarritoCompras;
  total: number =0;
  cartItems: ItemCarrito[] = [
    
  ];

  constructor(private carritoCompras: CarritoComprasService, 
    private router: Router,
    private authService: AuthService
  ) {
    this.carrito=this.carritoCompras.getCarrito();
    this.cartItems = this.carrito.itemsCarrito!; 
   }

  ngOnInit(): void {
    this.getTotal(Event);

   }

  getTotal(event: any): number {
    console.log('hola que hace')

    this.total= this.cartItems.reduce((total, item) => 
      total + ((item.producto?.precio ?? 0) * item.cantidad), 
      0);
    return this.total;
  }

  removeItem(productoId: number): void {
    this.carritoCompras.eliminarItem(productoId);
    this.carrito = this.carritoCompras.getCarrito();
    this.cartItems = this.carrito.itemsCarrito || []; // Actualiza la lista de ítems
    this.getTotal(Event); // Recalcula el total
  }


  mostrarModal: boolean = false;

  procederCompra(){
    if(this.authService.getIdUsuario()!){
      this.router.navigate(['/cliente/proceder-pago'])
    }else{
      this.mostrarModal = true;
    }

  }


  // Abrir el modal
  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  // Redirigir al login
  irAlLogin() {
    this.router.navigate(['/auth/login']); // Reemplaza con la ruta real de tu página de login
  }

  // Redirigir al registro
  irAlRegistro() {
    this.router.navigate(['/auth/register']); // Reemplaza con la ruta real de tu página de registro
  }
}