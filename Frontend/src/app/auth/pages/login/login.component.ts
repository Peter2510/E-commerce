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

  token!: string;
  verificacion: boolean = false;
  correoElectronico!: string;
  contrasenia!: string;
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
      next: (response: any) => {

        console.log(response.token);
        if (response.token == undefined) {
          console.log('holas que hace');
          this.verificacion = true;
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

  verificar() {
    this.authService.verificar(this.correoElectronico, this.token).subscribe({
      next: (response: any) => {
        this.inicioSesion(response.token);


      },
      error: (error) => {

        Swal.fire({
          icon: 'error',
          title: 'Error token incorecto',
          text: error.error.error || 'Ha ocurrido un error inesperado.',
        });
      }
    })
  }

  inicioSesion(token: string) {

    this.authService.saveToken(token);

    const message = `Bienvenido, ${this.authService.getNombre()}!`;

    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso ',
      text: message,
    });

    const idTipoUsuario = this.authService.getIdTipoUsuario();

    if (idTipoUsuario !== null) {
      const id = idTipoUsuario;

      if (id === 1) {
        this.router.navigate(['/admin']);
      } else if (id === 2) {
        this.router.navigate(['/cliente']);
      } else {
        this.router.navigate(['/ayudante']);
      }

    }

  }

}