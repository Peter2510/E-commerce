import { Component, inject } from '@angular/core';
import { ProductosServicioService } from '../services/productos-servicio.service';
import { ServicioInventarioService } from '../services/servicio-inventario.service';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.css'],
})
export class GestionInventarioComponent {
  servicioInventario = inject(ServicioInventarioService);
  isModalVisible: boolean = false;
  seleccionado: any;

  //abre los modals
  openModal(tipoElemento: string, elemento?: Producto) {
    this.isModalVisible = true;
    this.seleccionado = elemento;
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }
  cambiarEstado(id: number | undefined, estado: boolean) {
    this.servicioInventario.cambiarEstadoProducto(id, estado).subscribe();
  }
}
