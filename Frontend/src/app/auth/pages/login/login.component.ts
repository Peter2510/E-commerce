import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!:string;
  password!:string;
  user!: User;

  constructor(private authService: AuthService, private router: Router){}

  login(){
    if(!this.username|| !this.password ){
      console.log('Campos vacios')
      return
    }
    
    //se debe solicitar el servicio para autenticar xd
    this.authService.login(this.username, this.password).subscribe({
      next:(response:Object)=>{
        this.user = response as User;
        //guardar user en cookies o localstorage xd
        const message = `Bienvenido, ${this.user.nombre} (${this.user.username})`;
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso ',
          text: message,
        });
        if (this.user.id_tipo_user == '1') {
          this.router.navigate(['/admin']);
        } else if (this.user.id_tipo_user == '2'){
          this.router.navigate(['/cliente']);

        }else {
          this.router.navigate(['/ayudante']);
        }


      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.error.error || 'Ha ocurrido un error inesperado.',
        });
      }

    })

  }



}