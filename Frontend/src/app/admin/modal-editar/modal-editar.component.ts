import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { categoria, Marca } from 'src/app/interfaces/producto.interface';
import { ServicioAdminService } from '../services/servicio-admin.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css'],
})
export class ModalEditarComponent {
  @Input() isVisible = false;
  @Input() editabelvisible = false;
  @Input() tipo!: string;
  @Input() idEliminar?: categoria | Marca;
  @Output() closeModalEditar = new EventEmitter<void>();

  //servicio
  servicio = inject(ServicioAdminService);

  //funcion para cerrar
  cerrar() {
    this.closeModalEditar.emit();
  }
}
