import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css'],
})
export class RecuperarContraseniaComponent {
  servicioAuth = inject(AuthService);
  correoElectronico!: string;
  codigo!: string;
  sinCodigo: boolean = true;
  generarContrasenia: boolean = false;

  formulario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    codigo: new FormControl('', [Validators.required]),
    nuevaContrasenia: new FormControl('', [
      Validators.required,

      Validators.minLength(8),
    ]),
    confirmarContrasenia: new FormControl('', [
      Validators.required,

      Validators.minLength(8),
    ]),
  });
  obtener2FA() {
    console.log('hola');

    this.correoElectronico = this.formulario.get('correo')?.value || '';
    this.servicioAuth.generarCodigo(this.correoElectronico).subscribe({
      next: (response: any) => {
        console.log(response);

        if (response.ok) {
          this.sinCodigo = false;
          Swal.fire({
            icon: 'success',
            title: 'Listo',
            text: 'Se envio codigo de doble factor, ingreselo a continuacion.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Fallo',
            text: 'Error en el proceso',
          });
        }
      },
    });
  }

  verificar2FA() {
    this.codigo = this.formulario.get('codigo')?.value || '';
    this.servicioAuth.verificar(this.correoElectronico, this.codigo).subscribe(
      (codigo: any) => {
        console.log(codigo);
        if (codigo.ok) {
          this.generarContrasenia = true;
          Swal.fire({
            icon: 'success',
            title: 'Listo',
            text: 'Coincide el codigo, ingrese su nueva contrasenia',
          });
        }
      },
      (error) => {
        // Manejo del error
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Fallo',
            text: 'Error en el codigo, no coincide',
          });
        } else {
          // Manejo genérico de errores
          console.log('Mensaje de error:', error.message);
        }
      }
    );
  }

  cambioCredencial() {
    const password = this.formulario.get('nuevaContrasenia')?.value || '';
    const repitePassword =
      this.formulario.get('confirmarContrasenia')?.value || '';

    this.servicioAuth
      .cambioCredenciales(password, repitePassword, this.correoElectronico)
      .subscribe(
        (valor: any) => {
          console.log(valor);
          if (valor.ok) {
            this.generarContrasenia = true;
            Swal.fire({
              icon: 'success',
              title: 'Listo',
              text: 'Cambio generado',
            });
          }
        },
        (error) => {
          // Manejo del error
          if (error.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Fallo',
              text: 'contrasenias no coinciden',
            });
          } else if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Fallo',
              text: 'contrasenias no coinciden',
            }).then(() => {
              window.location.reload();
            });
          }
        }
      );
  }
}
