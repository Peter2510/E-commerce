import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { Carrito } from '../../../interfaces/cliente.interface';
import { CarritoComprasService } from '../../services/carrito-compras.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TiendaServicioService } from 'src/app/admin/services/tienda-servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  mostrarPerfil:boolean=false
  usuario:User = new User();
  idUser = this.servicio.getIdUsuario() || null;
  
  constructor(private service:ClienteService,
              private cookie:CookieService,
              private carritoService: CarritoComprasService,
              private router:Router,
              public servicioTienda: TiendaServicioService,
              private servicio:AuthService){
    service.getCliente().subscribe(
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
    this.service.cerrarSesion().subscribe({
      next:(response:any)=>{
      console.log('cerrando sesion');
        this.servicio.logout()
        this.carritoService.limpiarCarrito();
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.log(error);
      }
    }
    )
  }

  cantidadCarrito():number{
    return this.carritoService.getCantidadItems();
  }
}
