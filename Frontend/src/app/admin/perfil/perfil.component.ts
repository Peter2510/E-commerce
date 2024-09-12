import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{


tabActivo: string = 'infoPersonal';
vistaCambio: boolean = false;
contrasenaActual: string = '';
nuevaContrasena: string = '';
confirmarContrasena: string = '';
nombre = this.authService.getNombre();
nombreUsuario = this.authService.getNombreUsuario();
correoElectronico = this.authService.getCorreoElectronico();
a2fActivo = this.authService.getA2f();
edicion = {
  a2fActivo: false,
  contraseniaActual: '',
  nuevaContrasena: '',
  confirmarContrasenia: '',
}


constructor(private servicio: ServicioAdminService, private authService: AuthService) {}

ngOnInit() {
  this.a2fActivo = this.authService.getA2f();
}



guardarInformacionPersonal() {
  this.servicio.editarAdmin(this.edicion.a2fActivo).subscribe({
    next: (response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Informacion actualizada correctamente',
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: err.error.mensaje || 'Error al actualizar informacion',
      });
    },
  });
}
cambiarContrasena() {
  
  //valiar nuevas contraseñas 
  if(this.edicion.nuevaContrasena !== this.edicion.confirmarContrasenia){
    Swal.fire({
      icon: 'error',
      title: 'error',
      text: 'Las nuevas contraseñas no coinciden',
    });
    return;
  }

  
  if (this.edicion.contraseniaActual.length >= 8 && this.edicion.nuevaContrasena.length >= 8 && this.edicion.nuevaContrasena === this.edicion.confirmarContrasenia) {
    this.servicio
      .actualizarContrasenia(
        this.edicion.contraseniaActual,
        this.edicion.nuevaContrasena
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
