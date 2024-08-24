import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  producto: Producto | undefined;
  imagenPrincipal: string = '';
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Product 1',
      descripcion: 'This is a great product.',
      precio: 19.99,
      idCategoria: 1,
      idMarca: 1,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      nombre: 'Product 2',
      descripcion: 'This is a great product.',
      precio: 29.99,
      idCategoria: 1,
      idMarca: 1,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      nombre: 'Product 3',
      descripcion: 'This is a great product.',
      precio: 39.99,
      idCategoria: 1,
      idMarca: 1,
      imageUrl: 'https://via.placeholder.com/150',
    }
  ];

  imagenes: string[] = [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400/ff0000',
    'https://via.placeholder.com/600x400/00ff00'
  ];

  constructor(private route: ActivatedRoute, private clienteService: ClienteService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    //this.obtenerProducto(id);
    this.producto = this.productos.find(product => product.id === id);
  }
  setMainImage(imagen: string): void {
    this.imagenPrincipal = imagen;
  }

  obtenerProducto(id: number){
    this.clienteService.getProducto(id).subscribe({
      next: (response: any) => {
        this.producto = response as Producto;
      },
      error: (error) => {
      
      }
    }) 
  }

  agregarCarrito(){
    
  }

}
