import { Component, inject, OnInit } from '@angular/core';
import { ProductosServicioService } from '../services/productos-servicio.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css'],
})
export class GestionProductosComponent implements OnInit {
  servicioProducto = inject(ProductosServicioService);

  ngOnInit(): void {
    this.servicioProducto.ObtenerProductos(20);
  }
}
