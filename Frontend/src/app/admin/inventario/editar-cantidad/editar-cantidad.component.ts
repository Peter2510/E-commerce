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

@Component({
  selector: 'app-editar-cantidad',
  templateUrl: './editar-cantidad.component.html',
  styleUrls: ['./editar-cantidad.component.css'],
})
export class EditarCantidadComponent {
  servicio = inject(ServicioInventarioService);
  cantidad!: number;
  @Input() isVisible!: boolean;
  @Input() id!: Producto;
  @Output() closeModal = new EventEmitter<void>();

  agregarMasCantidad() {
    this.servicio
      .agregarMasProducto(this.id?.id, this.cantidad)
      .subscribe((elemento) => {
        console.log(elemento);
      });
  }

  cerrar() {
    this.closeModal.emit();
  }
}
