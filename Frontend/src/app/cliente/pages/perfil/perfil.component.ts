import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
@Input() usuario!:User;
}
