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
  nombre: string='';
  tipo: string='';
  vacio:boolean=false;
  constructor(private route: ActivatedRoute, 
    private clienteService: ClienteService,
    private carritoService:CarritoComprasService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.route.queryParamMap.subscribe(queryParams => {
    this.tipo = queryParams.get('tipo')!;
    this.nombre = queryParams.get('name')!;
    if (this.tipo=='Categoria') {
      this.obtenerProductos(id);
    }else{
      this.obtenerProductosMarca(id);
    }
    });

    
    

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
        this.vacio=true;
      }
    });
  }

  obtenerProductosMarca(id:number) {
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
        this.vacio=true;
      }
    });
  }

}
