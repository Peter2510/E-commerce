import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  usuario:User = new User();
  mostrarPerfil:boolean=false


  constructor(private service:ClienteService,private cookie:CookieService,private router:Router){
    service.getCliente(JSON.parse(cookie.get('token2')).id,cookie.get('token')).subscribe(
    {
      next: (response: any) => {
        const persona = response.persona;
        const usuario = response.usuario;
        this.usuario = usuario
        this.usuario.persona = persona
      },
      error: (error) => {

      }
    }
    )
  }

  cerrarSesion(){
    console.log('cerrando sesion');
    this.service.cerrarSesion().subscribe({
      next:(response:any)=>{
        this.cookie.delete('token')
        this.cookie.delete('token2')
        this.router.navigate(['/'])
      },
      error: (error) => {
      }
    }
    )
  }
}
