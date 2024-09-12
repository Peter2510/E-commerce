import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { tipopermiso } from 'src/app/interfaces/permisos.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BuzonService {

  token = this.cookie.get('token');
  idUsuario = this.authService.getIdUsuario();

  constructor(private cookie: CookieService, private http: HttpClient, private authService: AuthService) { }
    
 
  obtenerBuzonPrincipal(){
    return this.http.get(`${environment.baseUrlEnv}/buzon/primeros/${this.idUsuario}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    });
  }

  obtenerBuzonEspecifico(){
    return this.http.get(`${environment.baseUrlEnv}/buzon/todosMensajes/${this.idUsuario}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    });
  }

  obtenerNotificacion(id:any){
    return this.http.get(`${environment.baseUrlEnv}/buzon/obtenerNotificacionPorId/${this.idUsuario}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    });
  }

  marcarLeido(id:any){
    return this.http.post(`${environment.baseUrlEnv}/buzon/marcarLeido/${this.idUsuario}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    });
  }

}
