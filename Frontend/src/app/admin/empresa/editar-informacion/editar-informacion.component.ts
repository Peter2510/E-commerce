import { Component, inject } from '@angular/core';
import { TiendaServicioService } from '../../services/tienda-servicio.service';
import { tienda } from 'src/app/interfaces/tienda.interface';
import Swal from 'sweetalert2';

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
    this.servicioEmpresa.guardarInfoEmpresa(tienda, this.imagen).subscribe({
      next: (response) => {
        // Manejar la respuesta en caso de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Información de la empresa guardada exitosamente',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        // Manejar el error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar la información de la empresa',
          confirmButtonText: 'OK'
        });
        console.error('Error al guardar la información de la empresa:', error); // Imprimir el error en la consola
      }
    });
  }
}
