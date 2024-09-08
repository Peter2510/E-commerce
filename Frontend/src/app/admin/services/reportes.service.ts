import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private url = environment.baseUrlEnv;
  constructor(private http: HttpClient) {}

  public getCompraxFecha(fecha:String){
    return this.http.get(`${this.url}/compras/comprasPorFecha/${fecha}`,{withCredentials:true})
  }

  public getComprasxUsuario(idUsuario:number){
    console.log(idUsuario);
    
    return this.http.get(`${this.url}/compras/comprasPorUsuario/${idUsuario}`,{withCredentials:true})  
  }

  public getComprasxEstado(idEstadoCompra:number){
    return this.http.get(`${this.url}/compras/comprasPorEstadoCompra/${idEstadoCompra}`,{withCredentials:true})  
  }
}
