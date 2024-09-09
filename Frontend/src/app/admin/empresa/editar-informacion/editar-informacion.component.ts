import { Component, inject } from '@angular/core';
import { TiendaServicioService } from '../../services/tienda-servicio.service';

@Component({
  selector: 'app-editar-informacion',
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.css'],
})
export class EditarInformacionComponent {
  existeEmpresa: boolean = false;
  servicioEmpresa = inject(TiendaServicioService);

  imagen!: File;
  nombre!: string;
  descripcion!: string;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }
}
