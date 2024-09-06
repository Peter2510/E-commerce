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
  
  mostrarPerfil:boolean=false


  constructor(private service:ClienteService,private cookie:CookieService,private router:Router){
    
  }

  cerrarSesion(){
    this.service.cerrarSesion().subscribe({
      next:(response:any)=>{
      console.log('cerrando sesion');
        this.cookie.delete('token','/')
        this.cookie.delete('token2','/')
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.log(error);
      }
    }
    )
  }
}
