import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.development';
import { ReporteGeneral } from 'src/app/interfaces/reporteGeneral.interface';
@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private url = environment.baseUrlEnv;
  token = this.cookie.get('token');

  constructor(private http: HttpClient, private cookie: CookieService) {}

  public obtenerReporteGeneral = () => {
    return this.http.get<ReporteGeneral[]>(
      `${environment.baseUrlEnv}/administracion/reporteGeneral`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  };

  public getCompraxFecha(fecha: String) {
    return this.http.get(`${this.url}/compras/comprasPorFecha/${fecha}`);
  }

  public getComprasxUsuario(idUsuario: number) {
    console.log(idUsuario);

    return this.http.get(
      `${this.url}/compras/comprasPorUsuario/${idUsuario}`,
      {}
    );
  }

  public getComprasxEstado(idEstadoCompra: number) {
    return this.http.get(
      `${this.url}/compras/comprasPorEstadoCompra/${idEstadoCompra}`
    );
  }

  public topUsuariosCompras(cantidad:number){
    let parametros = new HttpParams()
      .set("cantidad",cantidad)
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/topUsuariosCompras`, {params:parametros, withCredentials: true });
  }

  public totalCompraUsuario(cantidad:number){
    let parametros = new HttpParams()
      .set("cantidad",cantidad)
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/totalCompraUsuario`, {params:parametros, withCredentials: true });
  }

  public compraMasAltayBaja(){
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/compraMasAltaYBaja`, { withCredentials: true });
  }

  public promedioCompraUsuario(cantidad:number){
    let parametros = new HttpParams()
      .set("cantidad",cantidad)
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/promedioCompraUsuario`, { params:parametros,withCredentials: true });  
  }
  public productoMasVendido(cantidad:number){
    let parametros = new HttpParams()
      .set("cantidad",cantidad)
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/productosMasComprados`, {params:parametros, withCredentials: true });  
  }
  public marcasMasVendido(cantidad:number){
    let parametros = new HttpParams()
      .set("cantidad",cantidad)
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/marcasMasVendidas`, {params:parametros, withCredentials: true });  
  }
  public categoriasMasVendido(cantidad:number){
    let parametros = new HttpParams()
      .set("cantidad",cantidad)
    return this.http.get<ReporteGeneral[]>(`${this.url}/reportes/CategoriasMasVendidas`,{params:parametros, withCredentials: true});  
  }
}
