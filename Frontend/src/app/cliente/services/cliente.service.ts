import { Injectable, numberAttribute } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user.interface';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

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

  listarProductosTodos(){
    return this.http.get(`${this.baseUrl}/productos/productos`);
  }

  listarProductosCategoria(id:number){
    return this.http.get(`${this.baseUrl}/productos/filtrar/?idCategoria=${id}`);
  }

  listarProductosMarca(id:number){
    return this.http.get(`${this.baseUrl}/productos/filtrar/?idMarca=${id}`);
  }

  listarProductosMarcaCategoria(idMarca:number,  idCategoria:number){
    return this.http.get(`${this.baseUrl}/productos/filtrar/?idMarca=${idMarca}&idCategoria=${idCategoria}`);
  }

  getProducto(id: number){
    return this.http.get(`${this.baseUrl}/productos/producto/${id}`);
  }

  getCategorias(){
    return this.http.get(`${this.baseUrl}/categorias/obtenerCategorias`);
  }

  getMarcas(){
    return this.http.get(`${this.baseUrl}/marcas/obtenerMarcas`);
  }

  registrarCompra(pedido: Pedido){
    return this.http.post(`${this.baseUrl}/compras/registrarCompra`,pedido,{withCredentials:true})
  }

  getCompras(){
    const idUsuario = this.servicio2.getIdUsuario();
    return this.http.get(`${this.baseUrl}/compras/comprasPorUsuario/${idUsuario}`,{withCredentials:true}) 
  }

  getDetalleCompras(idCompra:number){
    return this.http.get(`${this.baseUrl}/compras/detalleCompra/${idCompra}`,{withCredentials:true}) 
  }

  getUrl(nombreTienda:string){
    return this.http.get(`${this.baseUrl}/tienda/logo/${nombreTienda}`,{withCredentials:true})   
  }

  async obtenerInfoEmpresa(): Promise<any> {
    try {
      const response:any = await firstValueFrom(
        this.http.get(`${environment.baseUrlEnv}/tienda/obtenerElementos/`, {
          withCredentials: true,
        })
      );
      return response.tienda
    } catch (error) {
      console.error('Error al obtener la información de la empresa:', error);
    }
  }

}
