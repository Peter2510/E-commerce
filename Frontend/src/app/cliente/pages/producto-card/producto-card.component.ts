import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { CarritoComprasService } from '../../services/carrito-compras.service';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() product!: Producto;

  constructor(private carritoService: CarritoComprasService){}

  agregarCarrito(producto: Producto): void {
    Swal.fire({
      title: 'Agregar al carrito',
      html: `
        <p>${producto?.nombre}</p>
        <input id="swal-input-cantidad" class="swal2-input" type="number" placeholder="Cantidad" min="1" value="1">
      `,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar al carrito',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const cantidad = parseInt((document.getElementById('swal-input-cantidad') as HTMLInputElement).value, 10);
        
        if (isNaN(cantidad) || cantidad < 1) {
          Swal.showValidationMessage('Por favor ingrese una cantidad válida.');
          return false;
        }
        if(cantidad> producto.inventario!.cantidadtotal){
          Swal.showValidationMessage('Cantidad de producto insuficiente.');
          return false;
          
        }
        
        return {
          producto: producto,
          cantidad
        };
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const { producto, cantidad } = result.value;
        this.carritoService.agregarItem(producto, cantidad);
        Swal.fire({
          title: 'Producto agregado',
          text: `${producto.nombre} ha sido agregado al carrito con cantidad ${cantidad}`,
          icon: 'success'
        });
      }
    });
  }

}
