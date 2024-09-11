import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    (this.correoElectronico = this.formulario.get('correo')?.value || ''),
      this.servicioAuth
        .generarCodigo(this.correoElectronico)
        .subscribe((codigo: any) => {
          if (codigo.ok) {
            this.sinCodigo = false;
            console.log(codigo);
          }
        });
  }

  verificar2FA() {
    this.codigo = this.formulario.get('codigo')?.value || '';
    this.servicioAuth
      .verificar(this.correoElectronico, this.codigo)
      .subscribe((codigo: any) => {
        console.log(codigo);
        if (codigo.ok) {
          this.generarContrasenia = true;
        }
      });
  }

  cambioCredencial() {
    const password = this.formulario.get('nuevaContrasenia')?.value || '';
    const repitePassword =
      this.formulario.get('confirmarContrasenia')?.value || '';

    this.servicioAuth
      .cambioCredenciales(password, repitePassword, this.correoElectronico)
      .subscribe((valor) => {
        console.log(valor);
      });
  }
}
