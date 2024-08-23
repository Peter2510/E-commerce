import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = environment.baseUrlEnv;
  constructor(private http: HttpClient) {}

  cerrarSesion(){
    return this.http.post(`${this.baseUrl}/auth/logOut`, null);
  }

  listarProductos(){
    return this.http.get(`${this.baseUrl}/producto/listar`);
  }

  obtenerProducto(id:number){
    return this.http.get(`${this.baseUrl}/producto/:id`);
  }

}
