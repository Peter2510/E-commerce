import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  categoria,
  Marca,
  Producto,
} from 'src/app/interfaces/producto.interface';
import { ProductosServicioService } from '../../services/productos-servicio.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css'],
})
export class EliminarProductoComponent {
  @Input() isVisible = false;
  @Input() modalEdicion!: string;
  @Input() tipo!: string;
  @Input() idEliminar!: Producto;
  @Output() closeModal = new EventEmitter<void>();
  servicio = inject(ProductosServicioService);

  //funcion para eliminar
  eliminar() {
    this.servicio.eliminarProducto(this.idEliminar.id).subscribe();
  }

  //funcion para cerrar
  cerrar() {
    this.closeModal.emit();
  }
}
