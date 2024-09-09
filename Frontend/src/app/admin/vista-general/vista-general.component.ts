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
  usuario!: any;
  reportes: ReporteGeneral[] = [];
  constructor(
    private cookie: CookieService,
    private service: ServicioAdminService,
    private reportesService: ReportesService,
    private servicio: AuthService
  ) { }

  ngOnInit(): void {
    const id_cliente = this.servicio.getIdTipoUsuario();
    if (id_cliente != null) {
      this.service.obtenerEmpleadosId(id_cliente).subscribe({
        next: (response: any) => {
          console.log(response);

          const persona = response.persona;
          const usuario = response.usuario;
          this.usuario = usuario;
          this.usuario.persona = persona;
          console.log(this.usuario.persona);
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
