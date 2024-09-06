import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ClienteService } from '../../services/cliente.service';
import { CarritoComprasService } from '../../services/carrito-compras.service';

@Component({
  selector: 'app-listado-producto-filtro',
  templateUrl: './listado-producto-filtro.component.html',
  styleUrls: ['./listado-producto-filtro.component.css']
})
export class ListadoProductoFiltroComponent {
  products!:Producto[];
  constructor(private route: ActivatedRoute, 
    private clienteService: ClienteService,
    private carritoService:CarritoComprasService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerProductos(id);

  }

  obtenerProductos(id:number) {
    this.clienteService.listarProductosCategoria(id).subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.productos)) {
          this.products = response.productos as Producto[];
        } else {
          console.error("Estructura inesperada en la respuesta:", response);
        }
      },
      error: (error) => {
        console.error("Error al obtener productos:", error);
      }
    });
  }

}
