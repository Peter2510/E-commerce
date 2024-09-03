import { Component, inject, OnInit } from '@angular/core';
import { ProductosServicioService } from '../services/productos-servicio.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css'],
})
export class GestionProductosComponent implements OnInit {
  servicioProducto = inject(ProductosServicioService);
  elementoSeleccionado!: string;
  isDropdownOpen = false;
  nombre!: string;
  //pasa el dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //seleciona tipos de elementos
  selectItem(item: any) {
    this.elementoSeleccionado = item;
    console.log(this.isDropdownOpen, this.elementoSeleccionado);

    this.isDropdownOpen = false;
  }

  buscarElemento() {
    this.servicioProducto.busquedaProductosFiltrado(
      this.elementoSeleccionado,
      this.nombre
    );
  }
  ngOnInit(): void {
    this.servicioProducto.ObtenerProductos(20);
  }
}
