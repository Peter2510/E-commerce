import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrlEnv;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private cookieName = 'token';

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

  registro(usuario: User) {
    return this.http.post(`${this.baseUrl}/auth/crearCliente`, usuario);
  }

  //guardo Token en cookie
  saveToken(token: string): void {
    this.cookieService.set(this.cookieName, token);
  }

  //obtengo todo el token jwt
  private getToken(): string | null {
    return this.cookieService.get(this.cookieName);
  }

  //decodifico el token y devuelvo el objeto
  private decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  
  //cerrar sesion -> eliminar la cookie
  logout(): void {
    this.cookieService.delete(this.cookieName);
  }

  getIdUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idUsuario) {
      return decodedToken.idUsuario;
    }
    return null;
  }

  getIdTipoUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idTipoUsuario) {
      return decodedToken.idTipoUsuario;
    }
    return null;
  }

  getNombreUsuario(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.nombreUsuario) {
      return decodedToken.nombreUsuario;
    }
    return null;
  }

  getIATToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.iat) {
      return decodedToken.iat;
    }
    return null;
  }

  getExpToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp;
    }
    return null;
  }


}
