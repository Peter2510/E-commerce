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
  cantidad: number = 5;
  estado!: number;

  estadoCompras: any[] = [];
  cabeceras: string[] = [];
  valores: any[] = [];
  ObjectPdf: any;
  constructor(private service: ReportesService) {

  }

  generarReporte() {
    if (this.cantidad > 0) {
      switch (this.tipo) {
        case "fecha":
          this.reportexFecha()
          break;
        case "estado":
          this.reportexEstadoCompra()
          break;
        case "topUsuarios":
          this.topUsuarios()
          break;
        case "totalUsuarios":
          this.totalCompraUsuario()
          break;
        case "masAlta":
          this.compraMasAlta();
          break;
        case "masBaja":
          this.compraMasBaja();
          break;
        case "promedio":
          this.promedio();
          break;
        case "producto":
          this.productosMasVendidos();
          break;
        case "marcas":
          this.marcasMasVendidos();
          break;
        case "categorias":
          this.categoriasMasVendidos();
          break;
      }
    }
  }

  topUsuarios() {
    this.service.topUsuariosCompras(this.cantidad).subscribe({
      next: (response: any) => {
        console.log(response);
        this.llenarArreglos2(response, ["idUsuario", "nombreUsuario", "cantidadProductosComprados", "cantidadCompras"])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  productosMasVendidos() {
    this.service.productoMasVendido(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["cantidadVendida", "dineroGenerado", "nombreProducto"])
      }
    })
  }
  categoriasMasVendidos() {
    this.service.categoriasMasVendido(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["cantidadVendida", "dineroGenerado", "nombreCategoria"])
      }
    })
  }
  marcasMasVendidos() {
    this.service.marcasMasVendido(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["cantidadVendida", "dineroGenerado", "nombreMarca"])

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

  totalCompraUsuario() {
    this.service.totalCompraUsuario(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["idUsuario", "nombreUsuario", "numeroCompras", "totalCompras"])
      }
    })
  }

  promedio() {
    this.service.promedioCompraUsuario(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["idUsuario", "nombreUsuario", "promedioCompra"])
      }
    })
  }

  reportexUsuario(opciones: any) {
    this.service.getComprasxUsuario(opciones.idUsuario).subscribe({
      next: (response: any) => {
        this.llenarArreglos(response)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  reportexEstadoCompra() {
    this.service.getComprasxEstado(this.estado).subscribe({
      next: (response: any) => {
        this.llenarArreglos(response)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  compraMasAlta() {
    this.service.compraMasAltayBaja().subscribe({
      next: (response: any) => {
        console.log(response);
        this.llenarArreglos2(response, ["compraMasAlta", "fechaCompraMasAlta", "usuarioCompraMasAlta"])
      }
    })
  }
  compraMasBaja() {
    this.service.compraMasAltayBaja().subscribe({
      next: (response: any) => {
        console.log(response);
        this.llenarArreglos2(response, ["compraMasBaja", "fechaCompraMasBaja", "usuarioCompraMasBaja"])
      }
    })
  }


  getEstadoCompras() {

  }

  llenarArreglos(response: any) {
    let arreglo: any[] = response.compras
    if (response.compras && response.compras.length > 0) {
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
        formaEntrega: item.formaEntrega.tipo,
        idUsuario: item.usuario.id
      }))
    }
  }

  llenarArreglos2(response: any, principal: string[]) {
    let arreglo: any[] = response.data
    if (response.data && response.data.length > 0) {
      let primero = arreglo[0]
      this.cabeceras = principal.filter(key => Object.keys(primero).includes(key));
      this.valores = arreglo.map(item => {
        let mappedItem: any = {};
        principal.forEach(key => {
          mappedItem[key] = item[key] || ''; // Si no existe, asigna una cadena vacía
        });
        return mappedItem;
      });
    }
  }

  objectValues(obj: any): any[] {
    return Object.values(obj);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  descargarPdf() {
    console.log(this.valores);
    const documentDefinition = {
      pageSize: 'A4' as PageSize,
      pageOrientation: 'landscape' as PageOrientation,
      content: [
        {
          text: "REPORTE GENERADO",
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
