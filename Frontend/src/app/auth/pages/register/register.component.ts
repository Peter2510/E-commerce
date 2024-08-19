import { Component } from '@angular/core';
import { Person } from 'src/app/interfaces/person.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  mostrar:boolean = false;
  usuario: User = {
    id: 0,
    nombre: '',
    password: '',
    person:undefined,
    activo: true,
    idtipoUsuario: 0
  };
  persona: Person = {
    id: 0,
    nombre: '',
    correoElectronico: '',
    direccion: '',
    idtipoFormaPago: '',
    nit: '',
    fechaCreacion: new Date(),
    ultimoIngreso: new Date()
  };
  
  constructor(private authservice:AuthService){

  }

  cambiar(){
    console.log('cambiando');
    this.mostrar = !this.mostrar;
  }
  crearUsuario(){
    this.usuario.person = this.persona;
    console.log(this.usuario);
    this.authservice.registro(this.usuario).subscribe({
      next:(response:object)=>{
        console.log('TODO OK');
      },
      error:(err=>{
        console.log('NO OK');
      })
    })
  }
}