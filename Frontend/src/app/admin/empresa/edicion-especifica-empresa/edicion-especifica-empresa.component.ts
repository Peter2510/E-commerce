import { Component, inject } from '@angular/core';
import { TiendaServicioService } from '../../services/tienda-servicio.service';
import { tienda } from 'src/app/interfaces/tienda.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  constructor (private router: Router){

  }

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

    this.servicioEmpresa.editarEmpresa(tienda, this.password, this.imagen, this.nombre).subscribe({
      next: (response) => {
        // Manejar la respuesta en caso de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empresa editada exitosamente',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/admin/gestionEmpresa']);

      },
      error: (error) => {
        // Manejar el error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al editar la empresa',
          confirmButtonText: 'OK'
        });
        console.error('Error al editar la empresa:', error); // Imprimir el error en la consola
      }
    });
  }
}