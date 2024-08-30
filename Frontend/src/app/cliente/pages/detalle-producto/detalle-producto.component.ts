import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ClienteService } from '../../services/cliente.service';
import { Carrito } from '../../../interfaces/cliente.interface';
import { CarritoComprasService } from '../../services/carrito-compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  producto: Producto | undefined;
  imagenPrincipal: string | undefined;
  
  productos: Producto[] = [
  ];

  imagenes: string[] = [
  ];

  constructor(private route: ActivatedRoute, 
            private clienteService: ClienteService,
            private carritoService:CarritoComprasService,
          ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerProducto(id);

  }
  setMainImage(imagen: string): void {
    this.imagenPrincipal = imagen;
  }

  obtenerProducto(id: number){
    this.clienteService.getProducto(id).subscribe({
      next: (response: any) => {
        this.producto = response.producto as Producto;
        console.log('hola')
        console.log(this.producto)
        this.imagenPrincipal = this.producto?.url_imagenes[0].url
        this.producto?.url_imagenes.forEach(producto => {
        this.imagenes.push(producto.url)

    })
      },
      error: (error) => {
      
      }
    }) 
  }

  agregarCarrito(): void {
    Swal.fire({
      title: 'Agregar al carrito',
      html: `
        <p>${this.producto?.nombre}</p>
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
        
        return {
          producto: this.producto,
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
