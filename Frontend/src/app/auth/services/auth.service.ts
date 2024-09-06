import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrlEnv;

  constructor(private http: HttpClient,private cookie:CookieService) {}

  login(correoElectronico: string, contrasenia: string) {
    const body = { correoElectronico, contrasenia };
    console.log(body);
    
    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  verificar(correoElectronico: string, token: string) {
    const body = { correoElectronico, token };
    console.log(body);  
    return this.http.post(`${this.baseUrl}/auth/verify-2fa`, body);
  }

  registro(usuario:User){
    return this.http.post(`${this.baseUrl}/auth/crearCliente`,usuario)
  }
  getCliente(id_cliente:number) {
    return this.http.get(`${this.baseUrl}/cliente/obtenerClientePorId/${id_cliente}`, {
      withCredentials: true
    });
  }
}
