import { Component, inject, OnInit } from '@angular/core';
import { ProductosServicioService } from '../services/productos-servicio.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { EliminarProductoComponent } from '../productos/eliminar-producto/eliminar-producto.component';
EliminarProductoComponent;

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
  isModalVisible: boolean = false;
  seleccionado: any;
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

  //abre los modals
  openModal(tipoElemento: string, elemento?: Producto) {
    this.isModalVisible = true;
    this.seleccionado = elemento;
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }
  ngOnInit(): void {}
}
