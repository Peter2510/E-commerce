import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { formaPago } from 'src/app/interfaces/formaPago';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  //usuario: User = new User();
  usuario2: User = new User();
  // para que sea como input
  // usuario: input()
  @Input() usuario: User = new User();
  tabActivo: string = 'infoPersonal';
  vistaCambio: boolean = false;
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  formasPago!: formaPago[];

  constructor(private servicio: ClienteService) {}
  ngOnInit() {
    this.servicio.getCliente().subscribe({
      next: (response: any) => {
        this.usuario = response.usuario;
        this.usuario.persona = response.persona;
        this.usuario2 = response.usuario;
        this.usuario2.persona = response.persona;
      },
      error: (error) => {},
    });
    this.servicio.getFormasPago().subscribe({
      next: (response: any) => {
        this.formasPago = response.formaPagos;
      },
      error: (error) => {},
    });
  }

  guardarInformacionPersonal() {
    this.servicio.actualizarDatos(this.usuario2).subscribe({
      next: (Response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'OK',
          text: 'Datos actualizados correctamente',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: err.error.mensaje || 'Datos no actualizada correctamente',
        });
      },
    });
  }
  cambiarContrasena() {
    if (this.usuario.id && this.nuevaContrasena && this.confirmarContrasena) {
      this.servicio
        .actualizarContrasenia(
          this.usuario.id,
          this.contrasenaActual,
          this.nuevaContrasena
        )
        .subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: 'Contrasenia actualizada correctamente',
            });
            this.vistaCambio = false;
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'error',
              text: err.error.mensaje || 'Error al actualizar contrasenia',
            });
          },
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Llene correctamente el formulario',
      });
    }
  }
  activarTab(tab: string) {
    this.tabActivo = tab;
  }
}
