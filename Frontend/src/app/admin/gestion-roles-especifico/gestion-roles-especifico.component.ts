import {
  AfterContentInit,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { Person } from 'src/app/interfaces/person.interface';
import { User } from 'src/app/interfaces/user.interface';
import { PermisosServiciosService } from '../services/permisos-servicios.service';
import { tipopermiso } from 'src/app/interfaces/permisos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-roles-especifico',
  templateUrl: './gestion-roles-especifico.component.html',
  styleUrls: ['./gestion-roles-especifico.component.css'],
})
export class GestionRolesEspecificoComponent
  implements OnInit, AfterContentInit
{
  @Input('id') productId = '';
  //injectamos esto porque v16 no jala con input
  public route = inject(ActivatedRoute);
  id!: number;

  //persona
  persona!: Person;
  usuario!: User;
  tipoRol: any[] = [];
  tipoRol2!: any[];

  //servicio
  servicio = inject(ServicioAdminService);
  servicioPermisos = inject(PermisosServiciosService);
  permisosObtenidos = this.servicioPermisos.permisosUsuario;
  permisosGenerales = this.servicioPermisos.permisos;
  permisosNuevos = this.servicioPermisos.permisosNuevos;

  obtenerPersona(id: number) {
    this.servicio.obtenerAyudantePorId(id).subscribe((personaFinal: any) => {
      console.log(personaFinal);

      this.persona = personaFinal.persona;
      this.usuario = personaFinal.usuario;
    });
  }

  guardarCambios() {
    console.log(this.tipoRol, this.permisosNuevos());
    this.guardarRoles();
  }

  onCheckboxChange(item: any, event: Event) {
    console.log(
      this.permisosObtenidos().includes(item),
      this.tipoRol.includes(item)
    );
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.tipoRol.push(item);
      //se agrega a la signal
      this.permisosNuevos.set(this.tipoRol);
    } else {
      const index = this.tipoRol.findIndex((x) => x.id === item.id);
      if (index > -1) {
        this.tipoRol.splice(index, 1);
        this.permisosNuevos.set(this.tipoRol);
      }
    }
  }

  obtenerRolesUsuario(id: number) {
    console.log(this.servicioPermisos.permisosUsuario(), 'permisos');

    this.servicioPermisos
      .obtenerPermisosUsuario(id)
      .subscribe((elementos: any) => {
        console.log(elementos.todosTipos);
        this.servicioPermisos.permisosUsuario.set(elementos.todosTipos);
        this.tipoRol = this.servicioPermisos.permisosUsuario();
      });
  }

  incluye(item: any): boolean {
    return this.servicioPermisos
      .permisosUsuario()
      .some((rol) => rol.id === item.id);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerPersona(this.id);
    //llamada al servicio
    this.obtenerRolesUsuario(this.id);

    this.permisosNuevos.set(this.permisosObtenidos());

    console.log(
      this.permisosGenerales(),
      this.tipoRol,
      this.tipoRol2,
      this.servicioPermisos.permisosUsuario()
    );
  }

  guardarRoles() {
    this.servicioPermisos.guardarRoles(this.permisosNuevos(), this.id);
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: 'Se guardaron cambios en los permisos.',
    }).then(() => {
      window.location.reload();
    });
  }

  ngAfterContentInit(): void {
    // console.log(
    //   this.permisosObtenidos(),
    //   'aaaaaaaaaaaaaaa',
    //   this.tipoRol2,
    //   this.servicioPermisos.permisosUsuario()
    // );
  }
}
