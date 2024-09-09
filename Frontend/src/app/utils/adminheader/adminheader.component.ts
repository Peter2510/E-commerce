import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PermisosServiciosService } from 'src/app/admin/services/permisos-servicios.service';
import { ServicioAdminService } from 'src/app/admin/services/servicio-admin.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { CommonModule } from '@angular/common';

import {
  permisousuario,
  tipopermiso,
} from 'src/app/interfaces/permisos.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TiendaServicioService } from 'src/app/admin/services/tienda-servicio.service';
import { tienda } from 'src/app/interfaces/tienda.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class AdminheaderComponent implements OnInit {
  router = inject(Router);

  usuario!: User;
  idUsuario = this.loginService.getIdUsuario();
  idTipoUsuario = this.loginService.getIdTipoUsuario();
  mostrarPerfil: boolean = false;
  tipoPermisos: tipopermiso[] = [];
  empresa!: tienda;
  constructor(
    private service: ServicioAdminService,
    private serviceCliente: ClienteService,
    private cookie: CookieService,
    public servicioPermisos: PermisosServiciosService,
    public servicioTienda: TiendaServicioService,
    private loginService: AuthService
  ) {
    this.empresa = this.servicioTienda.infoEmpresa();
    console.log(this.empresa);
  }

  irGestionRoles() {
    this.router.navigateByUrl('/gestionRoles');
  }

  cerrarSesion() {
    this.serviceCliente.cerrarSesion().subscribe({
      next: (response: any) => {
        this.loginService.logout();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    const id_cliente = this.loginService.getIdUsuario();

    if (id_cliente != null) {
      this.idUsuario = id_cliente;

      this.service.obtenerEmpleadosId(this.idUsuario).subscribe({
        next: (response: any) => {
          console.log(response);

          const persona = response.persona;
          const usuario = response.usuario;
          this.usuario = usuario;
          this.usuario.persona = persona;
          console.log(this.usuario.id);
        },
        error: (error) => {},
      });

      console.log(this.servicioTienda.infoEmpresa(), this.empresa);
    }
  }
}
