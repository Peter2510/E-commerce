import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private service:ClienteService,private cookie:CookieService,private router:Router){
  
  }
  ngOnInit(){
  }

  cerrarSesion(){
    console.log('cerrando sesion');
    this.service.cerrarSesion().subscribe({
      next:(response:any)=>{
        this.cookie.delete('token')
        this.router.navigate(['/'])
      },
      error: (error) => {
      }
    }
    )
  }
}
