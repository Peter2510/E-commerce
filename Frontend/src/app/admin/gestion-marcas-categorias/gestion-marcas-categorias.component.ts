import { Component, inject, OnInit } from '@angular/core';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { categoria, Marca } from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-marcas-categorias',
  templateUrl: './gestion-marcas-categorias.component.html',
  styleUrls: ['./gestion-marcas-categorias.component.css'],
})
export class GestionMarcasCategoriasComponent implements OnInit {
  //servicios
  servicio = inject(ServicioAdminService);
  categoria = this.servicio.categorias;
  marcastotal = this.servicio.marcas;
  //elementos de pagina y moda;
  elementoSeleccionado!: string;
  isDropdownOpen = false;
  isModalVisible = false;
  editable: string = '';
  seleccionado?: categoria | Marca;
  // para la creacion
  nuevoNombreCategoria!: string;
  nuevoNombreMarca!: string;
  imagen!: File;

  //abre los modals
  openModal(tipoElemento: string, elemento?: categoria | Marca) {
    this.isModalVisible = true;
    this.seleccionado = elemento;
    if (tipoElemento == 'editar') {
      this.editable = 'editar';
      console.log(this.isModalVisible);
    } else if (tipoElemento == 'eliminar') {
      this.editable = 'eliminar';
      console.log(this.isModalVisible);
    }
  }
  // para el modal de edicion
  abrirModalEdicion(elemento?: categoria | Marca) {
    this.seleccionado = elemento;
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }

  //pasa el dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //seleciona tipos de elementos
  selectItem(item: any) {
    this.elementoSeleccionado = item;
    console.log(this.isDropdownOpen, this.elementoSeleccionado);

    this.isDropdownOpen = false;
  }

  // funcion para la creacion
  crearCategoria() {
    this.servicio.creacionCategoria(this.nuevoNombreCategoria, this.imagen).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Categoría creada exitosamente',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la categoría',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear la categoría:', error); // Imprimir el error en la consola
      }
    });
  }

  // funcion para la maraca
  crearMarca() {
    console.log(this.imagen);

    this.servicio.creacionMarca(this.nuevoNombreMarca, this.imagen).subscribe({
      next: (response) => {
        // Manejar la respuesta en caso de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Marca creada exitosamente',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        // Manejar el error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la marca',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear la marca:', error); // Imprimir el error en la consola
      }
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  ngOnInit() {
    this.elementoSeleccionado = 'Marca';

    console.log(this.elementoSeleccionado, this.isModalVisible);
  }
}
