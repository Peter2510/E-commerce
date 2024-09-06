import { Component, inject, Input, OnInit } from '@angular/core';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosServicioService } from '../services/productos-servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-productos-especifica',
  templateUrl: './gestion-productos-especifica.component.html',
  styleUrls: ['./gestion-productos-especifica.component.css'],
})
export class GestionProductosEspecificaComponent implements OnInit {
  productId!: number;
  public route = inject(ActivatedRoute);

  servicioMarcasCategorias = inject(ServicioAdminService);
  servicioProductos = inject(ProductosServicioService);
  marcasTotales = this.servicioMarcasCategorias.marcas;
  categoriasTotales = this.servicioMarcasCategorias.categorias;
  producto!: Producto;

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.servicioProductos
      .obtenerProductoId(this.productId)
      .subscribe((elemento: any) => {
        console.log(elemento);

        this.producto = elemento.producto;
      });
  }
}
