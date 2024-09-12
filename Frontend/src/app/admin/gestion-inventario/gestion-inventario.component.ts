import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductosServicioService } from '../services/productos-servicio.service';
import { ServicioInventarioService } from '../services/servicio-inventario.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.css'],
})
export class GestionInventarioComponent implements OnInit {
  obtenerEmpleados: any[] = [];
  displayedColumns: string[] = [
    'index',
    'nombre de real del empleado',
    'nombre de Usuario',
    'correo Electronico',
    'Tipo de Usuario',
    'ver cambios en inventario',
  ];
  //tabla 1
  dataSource = new MatTableDataSource<any[]>([]); // Tu fuente de datos
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  servicioInventario = inject(ServicioInventarioService);
  servicioAdmin = inject(ServicioAdminService);
  isModalVisible: boolean = false;
  seleccionado: any;
  modalHistorial: boolean = false;
  seleccionadoUsuario: any;

  elementoSeleccionado!: string;
  isDropdownOpen = false;
  nombre!: string;

  //abre los modals

  openModal(tipoElemento: string, elemento?: Producto) {
    this.isModalVisible = true;
    this.seleccionado = elemento;
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }

  openModalHistorial(elemento?: any) {
    this.modalHistorial = true;
    this.seleccionadoUsuario = elemento;
  }

  closeModalHistorial() {
    this.modalHistorial = false;
  }
  cambiarEstado(id: number | undefined, estado: boolean) {
    this.servicioInventario.cambiarEstadoProducto(id, estado).subscribe({
      next: (response) => {
        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Estado actualizado',
          text: 'El estado del producto ha sido actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.reload();
        });
      },
      error: (error: HttpErrorResponse) => {
        // Mostrar alerta de error
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al actualizar el estado del producto.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  //seleciona tipos de elementos
  selectItem(item: any) {
    this.elementoSeleccionado = item;
    console.log(this.isDropdownOpen, this.elementoSeleccionado);

    this.isDropdownOpen = false;
  }
  //pasa el dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  //busquedaProductosFiltrarRegexActivo
  buscarElemento() {
    this.servicioInventario.busquedaProductosFiltrarRegexActivo(
      this.elementoSeleccionado,
      this.nombre
    );
  }

  ngOnInit(): void {
    this.servicioAdmin.obtenerEmpleados().subscribe((empleado: any) => {
      console.log(empleado.empleados);
      console.log(empleado.empleado);
      console.log(empleado.persona);
      empleado.empleados.forEach((valorEmpleados: any) => {
        console.log(valorEmpleados);

        const valores = {
          id: valorEmpleados.usuario.id,
          nombreUsuario: valorEmpleados.usuario.nombreUsuario,
          idTipoUsuario: valorEmpleados.usuario.idTipoUsuario,
          correoElectronico: valorEmpleados.persona.correoElectronico,
          nombre: valorEmpleados.persona.nombre,
        };
        console.log(valores);

        this.obtenerEmpleados.push(valores);
      });

      console.log(this.obtenerEmpleados, '--------++++++++-----------');

      this.dataSource = new MatTableDataSource(this.obtenerEmpleados);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
