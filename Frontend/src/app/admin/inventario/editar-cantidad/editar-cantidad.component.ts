import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ServicioInventarioService } from '../../services/servicio-inventario.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-editar-cantidad',
  templateUrl: './editar-cantidad.component.html',
  styleUrls: ['./editar-cantidad.component.css'],
})
export class EditarCantidadComponent {
  servicio = inject(ServicioInventarioService);
  servicioAuth = inject(AuthService);
  cantidad!: number;
  @Input() isVisible!: boolean;
  @Input() id!: Producto;
  @Output() closeModal = new EventEmitter<void>();

  agregarMasCantidad() {
    this.servicio.agregarMasProducto(this.id?.id, this.cantidad).subscribe({
      next: (elemento) => {
        console.log(elemento);
        this.agregarLogProducto();
        Swal.fire({
          title: 'Cantidad actualizada',
          text: 'La cantidad del producto ha sido actualizada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.reload();
        });
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al actualizar la cantidad del producto.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  agregarLogProducto() {
    this.servicio
      .agregarLogProducto(
        this.id?.id,
        this.cantidad,
        this.servicioAuth.getIdUsuario()
      )
      .subscribe();
  }

  cerrar() {
    this.closeModal.emit();
  }
}
