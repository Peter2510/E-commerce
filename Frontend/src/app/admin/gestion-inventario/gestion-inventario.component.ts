import { Component, inject } from '@angular/core';
import { ProductosServicioService } from '../services/productos-servicio.service';
import { ServicioInventarioService } from '../services/servicio-inventario.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.servicioInventario.cambiarEstadoProducto(id, estado).subscribe({
      next: (response) => {
        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Estado actualizado',
          text: 'El estado del producto ha sido actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.reload();
        });
      },
      error: (error: HttpErrorResponse) => {
        // Mostrar alerta de error
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al actualizar el estado del producto.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }
}
