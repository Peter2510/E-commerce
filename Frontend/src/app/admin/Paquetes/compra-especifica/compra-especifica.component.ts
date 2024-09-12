import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ComprasService } from 'src/app/cliente/services/compras.service';
import { categoria, Marca } from 'src/app/interfaces/producto.interface';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-especifica',
  templateUrl: './compra-especifica.component.html',
  styleUrls: ['./compra-especifica.component.css'],
})
export class CompraEspecificaComponent implements OnInit {
  @Input() isVisible = false;
  @Input() tipo!: any;
  @Input() enProceso!: any;
  @Output() closeModal = new EventEmitter<void>();

  servicioCompras = inject(ComprasServicioService);
  elementosComprados: any;
  //funcion para cerrar
  cerrar() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    console.log(this.tipo);
    this.servicioCompras
      .obtenerCompraDetalle(this.tipo.id)
      .subscribe((productos: any) => {
        console.log(productos);

        this.elementosComprados = productos.compra.detalleCompra;
      });
  }

  determinarCambio(compra: number, valor: number) {
    this.servicioCompras.actualizarEstadoCompra(compra, valor);
    if (valor == 2) {
      Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: 'Se comienza a empacar la compra',
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: 'Se cancelo la compra.',
      }).then(() => {
        window.location.reload();
      });
    }
  }
}
