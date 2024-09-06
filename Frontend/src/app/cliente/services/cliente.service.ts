import { Injectable, numberAttribute } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = environment.baseUrlEnv;
  constructor(private http: HttpClient,private cookie:CookieService) { }

  cerrarSesion() {
    return this.http.post(`${this.baseUrl}/auth/logOut`,null,{withCredentials:true});
  }
  
  getFormasPago(){
    return this.http.get(`${this.baseUrl}/administracion/getFormasPago`,{withCredentials:true})
  }

  actualizarDatos(user:User){
    user.id = user.persona?.id
    return this.http.post(`${this.baseUrl}/cliente/editarCliente`,user,{withCredentials:true})
  }

  actualizarContrasenia(id:number,contraseniaActual:string,nuevaContrasenia:string){
    const body = {id,contraseniaActual,nuevaContrasenia}
    console.log(body);
    return this.http.post(`${this.baseUrl}/cliente/actualizarContrasenia`,body,{withCredentials:true})
  }

}
