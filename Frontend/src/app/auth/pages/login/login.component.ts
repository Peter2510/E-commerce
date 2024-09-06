import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  token!:string;
  verificacion:boolean=false;
  correoElectronico!:string;
  contrasenia!:string;
  user: User = new User();
  constructor(private authService: AuthService, private router: Router, private cookie: CookieService) {

  }

  login() {
    console.log('login ' + this.correoElectronico)
    if (!this.correoElectronico || !this.correoElectronico) {
      console.log('Campos vacios')
      return
    }
    //se debe solicitar el servicio para autenticar xd
    this.authService.login(this.correoElectronico, this.contrasenia).subscribe({
      next:(response:any)=>{

        console.log(response.token);
        if(response.token==undefined){
          console.log('holas que hace');
          this.verificacion=true;
          return;
        }
        
        this.inicioSesion(response.token);
      },
      error: (error) => {
        
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.error.mensaje || 'Ha ocurrido un error inesperado 2.',
        });
      }

    })

  }

  verificar(){
    this.authService.verificar(this.correoElectronico, this.token).subscribe({
      next: (response: any) => {
        this.inicioSesion(response.token);
  

      },
      error: (error) => {
        
        Swal.fire({
          icon: 'error',
          title: 'Error token incorecto',
          text: error.error.mensaje || 'Ha ocurrido un error inesperado.',
        });
      }
    })      
  }

  async inicioSesion(token:string){
    try {
      this.cookie.set('token',token);
      await this.parseJwt(token)
      //guardar user en cookies o localstorage xd
      const message = `Bienvenido, ${this.user.nombreUsuario}`;
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso ',
        text: message,
      });
      if (this.user.idTipoUsuario == 1) {
        this.router.navigate(['/admin']);
      } else if (this.user.idTipoUsuario == 2) {
        this.router.navigate(['/cliente']);
      } else {
        this.router.navigate(['/ayudante']);
      }

    } catch (error) {
      
    }
  }
  parseJwt(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
  
        const usuario = JSON.parse(jsonPayload);
        this.user.idTipoUsuario = usuario.idTipoUsuario;
        
        this.authService.getCliente(usuario.idUsuario).subscribe({
          next: (response: any) => {
            this.user = response.usuario;
            this.user.persona = response.persona;
            this.cookie.set('token2', JSON.stringify(this.user));
            console.log(this.user);
            resolve(); 
          },
          error: (error) => {
            console.log(error);
            reject(error); 
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}