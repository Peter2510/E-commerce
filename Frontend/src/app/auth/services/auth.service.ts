import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrlEnv;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  private cookieName = 'token';

  login(correoElectronico: string, contrasenia: string) {
    const body = { correoElectronico, contrasenia };
    console.log(body);

    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  generarCodigo(correoElectronico: string) {
    const body = { correoElectronico };
    return this.http.post(`${this.baseUrl}/auth/enable-2fa`, body);
  }

  cambioCredenciales(
    contrasenia: string,
    mismaContrasenia: string,
    correoElectronico: string
  ) {
    const body = { contrasenia, mismaContrasenia, correoElectronico };

    return this.http.post(`${this.baseUrl}/auth/cambioCredenciales`, body);
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
    this.cookieService.set(this.cookieName, token, undefined ,'/');
  }

  //obtengo todo el token jwt
  public getToken(): string | null {
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
    this.router.navigate(['/']);
  }

  getIdUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idUsuario) {
      return decodedToken.idUsuario;
    }
    return null;
  }

  public getIdTipoUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idTipoUsuario) {
      console.log(decodedToken.idTipoUsuario, '---------');

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
  getA2f(): boolean | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.a2fActivo) {
      return decodedToken.a2fActivo;
    }
    console.log(decodedToken.a2fActivo);
    return null;
  }

  getNombre(): boolean | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.nombre) {
      return decodedToken.nombre;
    }
    return null;
  }

  getDirecccion(): boolean | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.direccion) {
      return decodedToken.direccion;
    }
    return null;
  }

  getFechaCreacion(): boolean | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.fechaCreacion) {
      return decodedToken.fechaCreacion;
    }
    return null;
  }
}
