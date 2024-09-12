import { Component, inject } from '@angular/core';
import { TiendaServicioService } from '../../services/tienda-servicio.service';
import { tienda } from 'src/app/interfaces/tienda.interface';

@Component({
  selector: 'app-edicion-especifica-empresa',
  templateUrl: './edicion-especifica-empresa.component.html',
  styleUrls: ['./edicion-especifica-empresa.component.css'],
})
export class EdicionEspecificaEmpresaComponent {
  nombre!: string;
  direccion!: string;
  password!: string;
  imagen!: File;
  servicioEmpresa = inject(TiendaServicioService);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  editar(id: number, nombre: string) {
    let tienda: tienda = {
      id: id,
      nombre: this.nombre,
      direccion: this.direccion,
    };

    this.servicioEmpresa
      .editarEmpresa(tienda, this.password, this.imagen, nombre)
      .subscribe();
  }
}