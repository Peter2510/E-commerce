import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosServicioService } from '../services/productos-servicio.service';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dar-baja',
  templateUrl: './dar-baja.component.html',
  styleUrls: ['./dar-baja.component.css'],
})
export class DarBajaComponent {
  @Input() isVisible = false;
  @Input() modalEdicion!: string;
  @Input() tipo!: string;
  @Input() idEliminar!: User;
  @Output() closeModal = new EventEmitter<void>();
  servicio = inject(ServicioAdminService);

  //funcion para eliminar
  eliminar() {
    console.log(this.idEliminar.id);

    this.servicio.darBaja(this.idEliminar.id).subscribe((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: 'Cambio generado',
      });
    });
  }

  //funcion para cerrar
  cerrar() {
    this.closeModal.emit();
  }
}
