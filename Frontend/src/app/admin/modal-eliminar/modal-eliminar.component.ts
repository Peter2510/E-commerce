import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { categoria, Marca } from 'src/app/interfaces/producto.interface';
import { ServicioAdminService } from '../services/servicio-admin.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css'],
})
export class ModalEliminarComponent implements OnInit {
  @Input() isVisible = false;
  @Input() modalEdicion!: string;
  @Input() tipo!: string;
  @Input() idEliminar?: categoria | Marca;
  @Output() closeModal = new EventEmitter<void>();

  nombre!: string;
  imagen!: File;

  //servicio
  servicio = inject(ServicioAdminService);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  //SOLO PARA VER QUE ES
  esMarca(obj?: categoria | Marca): obj is Marca {
    return (obj as Marca).nombreMarca !== undefined;
  }

  esCategoria(obj?: categoria | Marca): obj is categoria {
    return (obj as categoria).nombreCategoria !== undefined;
  }

  //funcion para eliminar
  eliminar() {
    if (this.tipo === 'Marca') {
      this.servicio.eliminarMarca(this.idEliminar?.id).subscribe();
    } else {
      this.servicio.eliminarCategoria(this.idEliminar?.id).subscribe();
    }
  }

  //funcion para editar
  editar() {
    if (this.tipo === 'Marca') {
      console.log(this.nombre, this.imagen);

      this.servicio
        .actualizarMarca(this.idEliminar?.id, this.nombre, this.imagen)
        .subscribe();
    } else {
      console.log(this.imagen);

      this.servicio.actualizarCategoria(
        this.idEliminar?.id,
        this.nombre,
        this.imagen
      );
    }
  }
  //funcion para obtener el nombre como tal
  obtenerNombre() {
    if (this.tipo === 'Marca' && this.esMarca(this.idEliminar)) {
      this.nombre = this.idEliminar.nombreMarca;
      console.log(this.idEliminar.nombreMarca);
    } else if (this.tipo === 'Categoria' && this.esCategoria(this.idEliminar)) {
      console.log(this.idEliminar.nombreCategoria);
      this.nombre = this.idEliminar.nombreCategoria;
    }
  }
  //funcion para cerrar
  cerrar() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    this.obtenerNombre();
    console.log(this.isVisible, this.modalEdicion, this.nombre);
  }
}
