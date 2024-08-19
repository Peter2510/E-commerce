import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  mostrar:boolean = false;

  cambiar(){
    console.log('cambiando');
    this.mostrar = true;
  }
}
