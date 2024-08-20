import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3200/api/v1';

  constructor(private http: HttpClient) { }


  login(correoElectronico: string, contrasenia: string) {
    const body = { correoElectronico, contrasenia };
    console.log(body);
    
    return this.http.post(`${this.baseUrl}/usuarios/login`, body);
  }

  registro(usuario:User){
    return this.http.post(`${this.baseUrl}/usuarios/crearCliente`,usuario)
  }
}
