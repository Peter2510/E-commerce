import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user.interface';
import { ClienteService } from '../cliente/services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  user!: User;

  constructor(private cookie: CookieService, private clienteService: ClienteService) { }


  

  getUser(): User{
    this.clienteService.getCliente().subscribe({
      next: (response: any) => {
        this.user = response.usuario;
        console.log('user is ')
        console.log(this.user)
        this.user.persona = response.persona;
        console.log(this.user.persona)
      },
      error: (error) => {},
    });
    return this.user;
  }

}
