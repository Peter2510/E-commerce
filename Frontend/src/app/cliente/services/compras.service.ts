import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private baseUrl = environment.baseUrlEnv;

  constructor(private http:  HttpClient) { }

  registrarCompra(pedido: Pedido){
    return this.http.post(`${this.baseUrl}/compras/registrarCompra`,pedido,{withCredentials:true})
  }


  obtenerToken(): string {
    // Obtén el token desde localStorage, cookies, etc.
    return localStorage.getItem('token') || '';
  }
}
