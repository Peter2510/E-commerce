import { Component } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PageOrientation, PageSize, Style } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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
  ObjectPdf:any;
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
      case "topUsuarios":
        this.topUsuarios()
        break;
    }
  }

  topUsuarios(){
    this.service.topUsuariosCompras().subscribe({
      next:(response:any)=>{
        console.log(response);
        let arreglo: any[] = response.data
        let primero = arreglo[0]
        this.cabeceras = Object.keys(primero)
        this.valores = arreglo.map(item => ({
          cantidadCompras: item.cantidadcompras,
          idUsuario: item.idUsuario,
          nombreUsuario: item.nombreUsuario
        }));
      },
      error :(err)=>{
        console.log(err);
      }
    })
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
    if(response.compras > 1){
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
      estadoCompra: item.estadoCompra.estado,
      formaEntrega: item.formaEntrega.tipo
    }));
  }
  }

  objectValues(obj: any): any[] {
    return Object.values(obj);
  }

  descargarPdf(){
    console.log(this.valores);
    const documentDefinition = {
      pageSize: 'A4' as PageSize,
      pageOrientation: 'landscape' as PageOrientation, 
      content: [
        {
          text: 'Reporte',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            body: [
              [...this.cabeceras], // Se crea una copia de las cabeceras
              ...this.valores.map(item =>
                this.cabeceras.map(header => item[header] || '') // Filas de datos
              )
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
    //this.ObjectPdf.download("reporte.pdf");
  }

}
