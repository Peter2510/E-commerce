import { Component, inject } from '@angular/core';
import { TiendaServicioService } from '../../services/tienda-servicio.service';
import { tienda } from 'src/app/interfaces/tienda.interface';

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
  direccion!: string;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  crearTienda() {
    const tienda: tienda = {
      nombre: this.nombre,
      direccion: this.direccion,
    };
    this.servicioEmpresa.guardarInfoEmpresa(tienda, this.imagen).subscribe();
  }
}
