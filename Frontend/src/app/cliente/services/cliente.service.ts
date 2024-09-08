import { Injectable, numberAttribute } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = environment.baseUrlEnv;
  constructor(private http: HttpClient,private cookie:CookieService,private servicio2:AuthService) { }

  cerrarSesion() {
    return this.http.post(`${this.baseUrl}/auth/logOut`,null,{withCredentials:true});
  }

  getCliente() {
    const id_cliente = this.servicio2.getIdUsuario();
    return this.http.get(`${this.baseUrl}/cliente/obtenerClientePorId/${id_cliente}`, {
      withCredentials: true
    });
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

  listarProductos(){
    return this.http.get(`${this.baseUrl}/productos/productosRandom/10`);
  }

  listarProductosCategoria(id:number){
    return this.http.get(`${this.baseUrl}/productos/filtrar/?idCategoria=${id}`);
  }

  getProducto(id: number){
    return this.http.get(`${this.baseUrl}/productos/producto/${id}`);
  }

  getCategorias(){
    return this.http.get(`${this.baseUrl}/categorias/obtenerCategorias`);
  }



}
