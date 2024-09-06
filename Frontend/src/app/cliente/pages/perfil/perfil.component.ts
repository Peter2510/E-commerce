import {Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { formaPago } from 'src/app/interfaces/formaPago';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario: User = new User();
  usuario2:User = new User();
  tabActivo: string = 'infoPersonal';
  vistaCambio:boolean = false
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  formasPago!: formaPago[]

  constructor(private servicio: ClienteService,private cookie:CookieService) {
  }
  ngOnInit(){
    this.usuario = JSON.parse(this.cookie.get('token2'))
    this.usuario2 = JSON.parse(this.cookie.get('token2'))
    this.servicio.getFormasPago().subscribe({
      next:(response:any)=>{
        this.formasPago = response.formaPagos
      },
      error:(error)=>{
      }
    })
  }
  
  guardarInformacionPersonal(){
    this.servicio.actualizarDatos(this.usuario2).subscribe({
      next:(Response:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'OK',
          text: "Datos actualizados correctamente",
        });
        this.usuario = this.usuario2
        JSON.parse(this.cookie.get('token2')).nombreUsuario = this.usuario2.nombreUsuario
      },
      error:(err)=>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: err.error.mensaje||"Datos no actualizada correctamente",
        });
      }
    })
  }
  cambiarContrasena(){
    if(this.usuario.id && this.nuevaContrasena && this.confirmarContrasena ){
    this.servicio.actualizarContrasenia(this.usuario.id,this.contrasenaActual,this.nuevaContrasena).subscribe(
      {
        next:(response:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Contrasenia actualizada correctamente",
          });

          this.vistaCambio = false
        },
        error:(err)=>{
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.error.mensaje||"Error al actualizar contrasenia",
          });
        }
      }
    )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: "Llene correctamente el formulario",
      });
    }
  }
  activarTab(tab: string) {
    this.tabActivo = tab;
  }
}
