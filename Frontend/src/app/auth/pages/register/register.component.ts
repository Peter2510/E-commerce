import { Component } from '@angular/core';
import { Person } from 'src/app/interfaces/person.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario: User = {
    id: 0,
    nombreUsuario: '',
    contrasenia: '',
    persona: undefined,
    activo: true,
    idTipoUsuario: 1,
    a2fActivo:false
  };
  persona: Person = new Person();
  
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    nit: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(5)]),
    nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contrasenia: new FormControl('', [Validators.required, Validators.minLength(8)]),
    contrasenia2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    idTipoFormaPago: new FormControl('', [Validators.required])
  });
  constructor(private authservice: AuthService,private router:Router) {

  }

  crearUsuario() {
    if (this.formulario.valid && this.formulario.get('contrasenia')?.value === this.formulario.get('contrasenia2')?.value) {
      this.persona = new Person(
        this.formulario.get('nombre')?.value || '',
        this.formulario.get('correo')?.value || '',
        this.formulario.get('direccion')?.value || '',
        this.formulario.get('idTipoFormaPago')?.value || '',
        this.formulario.get('nit')?.value || '',
        new Date().toISOString(),
        new Date().toISOString()
      );
      this.usuario = {
        id: 0, 
        nombreUsuario: this.formulario.get('nombreUsuario')?.value || '',
        contrasenia: this.formulario.get('contrasenia')?.value || '',
        persona: this.persona,
        activo: true, 
        idTipoUsuario: 1,
        a2fActivo:false
      };
      this.usuario.persona = this.persona;
      console.log(this.usuario);
      this.authservice.registro(this.usuario).subscribe({
        next:(response:object)=>{
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Usuario creado correctamente",
          });
          this.router.navigate(['/'])
        },
        error:(err=>{
          console.log(err);
          
          if(err.status == 409){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error.error || 'El correo electronico ya esta en uso',
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.mensaje || 'Error de conexion con el servidor',
            });
          }
        })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'por favor llene correctamente el formulario',
      });
    }
  }
}