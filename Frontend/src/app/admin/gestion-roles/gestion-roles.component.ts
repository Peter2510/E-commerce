import { Component, inject, OnInit } from '@angular/core';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { tipoUsuario, User } from 'src/app/interfaces/user.interface';
import { formaPago, Person } from 'src/app/interfaces/person.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-roles',
  templateUrl: './gestion-roles.component.html',
  styleUrls: ['./gestion-roles.component.css'],
})
export class GestionRolesComponent implements OnInit {
  //servicio
  servicio = inject(ServicioAdminService);

  //valores
  tiposRoles: tipoUsuario[] = [];
  tiposPago: formaPago[] = [];
  empleados: User[] | any = [];
  personas: Person[] = [];
  nuevoRol!: string;

  //elementos para crear un usuario
  nombrePersona!: string;
  nit!: string;
  correo!: string;
  direccion!: string;
  idTipoFormaPago!: number;
  idTipoUsuario!: number;
  nombreUsuario!: string;
  contrasenia!: string;
  contraseniaRepeticion!: string;

  isModalVisible: boolean = false;
  seleccionado: any;
  obtenerRoles() {
    this.servicio.obtenerRoles().subscribe({
      next: (r_success: any) => {
        console.log(r_success);
        this.tiposRoles = r_success.tipoUsuarios;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  obtenerFormasPago() {
    this.servicio.obtenerFormasPago().subscribe({
      next: (r_success: any) => {
        console.log(r_success);
        this.tiposPago = r_success.formaPagos;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  obtenerEmpleados() {
    this.servicio.obtenerEmpleados().subscribe({
      next: (r_success: any) => {
        console.log(r_success.empleados);
        r_success.empleados.forEach((element: any) => {
          if (element.usuario.idTipoUsuario !== 1) {
            this.empleados.push(element.usuario);
            this.personas.push(element.persona);
          }
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  tiposUsuario(codigo: number): string {
    let tipo: string = '';

    switch (codigo) {
      case 1: {
        tipo = 'Administador';
        break;
      }
      case 2: {
        tipo = 'Cliente';

        break;
      }
      case 3: {
        tipo = 'Ayudante';

        break;
      }
    }

    return tipo;
  }

  //funcion para crear un nuevo rol

  creacionRol() {
    if (this.nuevoRol != '') {
      this.servicio.crearRoles(this.nuevoRol).subscribe();
    }
  }

  //funcion para la creacion de un nuevo emplado

  crearEmpleado() {
    //creacion de personas
    let nuevaPersona: Person = {
      nombre: this.nombrePersona,
      nit: this.nit,
      correoElectronico: this.correo,
      direccion: this.direccion,
      idTipoFormaPago: this.idTipoFormaPago,
    };

    if (this.contrasenia === this.contraseniaRepeticion) {
      this.servicio
        .crearUsuario(
          this.nombreUsuario,
          this.contrasenia,
          nuevaPersona,
          this.idTipoUsuario
        )
        .subscribe();
    }
  }

  //abre los modals
  openModal(elemento?: User) {
    this.isModalVisible = true;
    this.seleccionado = elemento;
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerEmpleados();
    this.obtenerFormasPago();
  }
}
