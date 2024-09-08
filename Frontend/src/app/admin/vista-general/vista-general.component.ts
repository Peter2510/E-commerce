import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrls: ['./vista-general.component.css'],
})
export class VistaGeneralComponent {
  usuario!: any;

  constructor(
    private cookie: CookieService,
    private service: ServicioAdminService
  ) {}

  ngOnInit(): void {
    const id_cliente = JSON.parse(this.cookie.get('token2')).id;
    this.service.obtenerEmpleadosId(id_cliente).subscribe({
      next: (response: any) => {
        console.log(response);

        const persona = response.persona;
        const usuario = response.usuario;
        this.usuario = usuario;
        this.usuario.persona = persona;
        console.log(this.usuario.persona);
      },
      error: (error) => {},
    });
  }
}
