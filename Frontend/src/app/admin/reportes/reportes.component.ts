import { Component } from '@angular/core';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  tipo:String="";
  fecha!:String;
  idUsuario:number=0;
  cabeceras: string[] = [];
  valores: any[] = [];
  constructor(private service:ReportesService){

  }

  generarReporte(){
    console.log("tipo",this.tipo);
    switch(this.tipo){
      case "general":
        this.reportexFecha()
        break;
      case "usuario":
        this.reportexUsuario()
        break;
    }
  }

  reportexFecha(){
    this.service.getCompraxFecha(this.fecha).subscribe({
      next:(response:any)=>{
        let arreglo:any[] = response.compras 
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
        
        console.log(this.cabeceras);
        console.log(this.valores);
        
      },
      error:(err)=>{

      }
    })
  }

  reportexUsuario(){

  }

  objectValues(obj: any): any[] {
    return Object.values(obj);
  }
}
