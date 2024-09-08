import { Component } from '@angular/core';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  tipo: String = "";
  fecha!: String;
  idUsuario: number = 0;
  estado!:number;

  estadoCompras:any[] = [];
  cabeceras: string[] = [];
  valores: any[] = [];
  constructor(private service: ReportesService) {

  }

  generarReporte() {
    console.log("tipo", this.tipo);
    switch (this.tipo) {
      case "fecha":
        this.reportexFecha()
        break;
      case "usuario":
        this.reportexUsuario()
        break;
      case "estado":
        this.reportexEstadoCompra()
        break;
    }
  }

  reportexFecha() {
    this.service.getCompraxFecha(this.fecha).subscribe({
      next: (response: any) => {
        this.llenarArreglos(response)
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  reportexUsuario() {
    this.service.getComprasxUsuario(this.idUsuario).subscribe({
      next: (response: any) => {
        this.llenarArreglos(response)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  reportexEstadoCompra(){
    this.service.getComprasxEstado(this.estado).subscribe({
      next: (response: any) => {
        this.llenarArreglos(response)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getEstadoCompras(){

  }

  llenarArreglos(response: any) {
    let arreglo: any[] = response.compras
    let primero = arreglo[0]
    this.cabeceras = Object.keys(primero)
    this.valores = arreglo.map(item => ({
      id: item.id,
      nit: item.nit,
      precioTotal: item.precioTotal,
      fecha: item.fecha,
      recargo: item.recargo,
      direccionEntrega: item.direccionEntrega,
      usuario: item.usuario.nombreUsuario,
      estado: item.estadoCompra.estado,
      formaEntraga: item.formaEntrega.tipo
    }));
  }

  objectValues(obj: any): any[] {
    return Object.values(obj);
  }
}
