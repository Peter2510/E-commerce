import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ServicioInventarioService } from '../../services/servicio-inventario.service';

@Component({
  selector: 'app-mostar-registro-logs',
  templateUrl: './mostar-registro-logs.component.html',
  styleUrls: ['./mostar-registro-logs.component.css'],
})
export class MostarRegistroLogsComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Input() id!: Producto;
  @Output() closeModal = new EventEmitter<void>();

  servicioInventario = inject(ServicioInventarioService);
  valores!: any;

  obtenerElementos() {
    this.servicioInventario
      .obtenerModificacionesporUsuario(this.id.id)
      .subscribe((elementos) => {
        this.valores = elementos;
        console.log(elementos);
      });
  }

  cerrar() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    this.obtenerElementos();
  }
}
