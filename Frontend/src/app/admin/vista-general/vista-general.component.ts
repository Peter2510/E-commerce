import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReporteGeneral } from 'src/app/interfaces/reporteGeneral.interface';
import { CookieService } from 'ngx-cookie-service';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrls: ['./vista-general.component.css'],
})
export class VistaGeneralComponent {
  
  reportes: ReporteGeneral[] = [];
  nombreUsuario =this.servicio.getNombreUsuario();
  a2fActivo = this.servicio.getA2f();
  idTipoUsuario=this.servicio.getIdTipoUsuario();
  nombre=this.servicio.getNombre();
  direccion= this.servicio.getDirecccion()
  fechaCreacion = this.servicio.getFechaCreacion()
  constructor(
    private cookie: CookieService,
    private service: ServicioAdminService,
    private reportesService: ReportesService,
    private servicio: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.a2fActivo);
    const id_cliente = this.servicio.getIdTipoUsuario();
    if (id_cliente != null) {
      this.service.obtenerEmpleadosId(id_cliente).subscribe({
        next: (response: any) => {
          console.log(response);

          const persona = response.persona;
          const usuario = response.usuario;
        },
        error: (error) => { },
      });
    }
    this.reportesService.obtenerReporteGeneral().subscribe({
      next: (response: any) => {
        this.reportes = response.reporte;
        console.log(this.reportes);


      }, error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

}
