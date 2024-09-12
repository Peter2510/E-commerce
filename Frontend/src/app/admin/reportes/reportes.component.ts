import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, PageOrientation, PageSize, Style } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { Chart, ChartType } from 'chart.js/auto';
import { ClienteService } from 'src/app/cliente/services/cliente.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit{
  tipo: String = "";
  fecha!: String;
  cantidad: number = 5;
  estado!: number;

  estadoCompras: any[] = [];
  cabeceras: string[] = [];
  valores: any[] = [];
  ObjectPdf: any;
  infoEmpresa!:any
  base64Image!:string
  public chart!:Chart
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  constructor(private service: ReportesService,private service2:ClienteService) {
    
  }
  ngOnInit(): void {
    this.iniciar()
  }
  generarReporte() {
    if (this.cantidad > 0) {
      if (this.chart) {
        this.chart.destroy();
      }
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
        case "entrega":
          this.formaEntrega()
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
        this.generarGrafica("nombreProducto","cantidadVendida")
      }
    })
  }

  formaEntrega(){
    this.service.getFormaEntrega().subscribe({
      next:(response:any)=>{
        this.llenarArreglos2(response,["formaEntrega","numeroCompras"])
        this.generarGrafica("formaEntrega","numeroCompras")
      }
    })
  }

  categoriasMasVendidos() {
    this.service.categoriasMasVendido(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["cantidadVendida", "dineroGenerado", "nombreCategoria"])
        this.generarGrafica("nombreCategoria","cantidadVendida")
      }
    })
  }
  marcasMasVendidos() {
    this.service.marcasMasVendido(this.cantidad).subscribe({
      next: (response: any) => {
        this.llenarArreglos2(response, ["cantidadVendida", "dineroGenerado", "nombreMarca"])
        this.generarGrafica("nombreMarca","cantidadVendida")
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


  async iniciar():Promise<void>{
    const info = await this.service2.obtenerInfoEmpresa()
    this.infoEmpresa = info[0]
    this.service2.getUrl(this.infoEmpresa.nombre).subscribe({
      next:(response:any)=>{
        this.base64Image = response.base64
      }
    })
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
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const chartImage = canvas.toDataURL('image/png');
    const documentDefinition = {
      pageSize: 'A4' as PageSize,
      pageOrientation: 'landscape' as PageOrientation,
      content: [
        {
          text: "REPORTE GENERADO",
          style: 'header',
          alignment: 'center' as Alignment
        },
        {
          columns: [
            [
              { text: `${this.infoEmpresa.nombre}`, bold: true },
              { text: `${this.infoEmpresa.direccion}` },
              {image: `${this.base64Image}`,
                width: 50
              }
            ],
            [
              {
                text: `Fecha: ${new Date().toLocaleDateString()}`,
                alignment: 'right' as Alignment
              },
              {
                text: `Reporte`,
                alignment: 'right' as Alignment
              }
            ]
          ]
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
        },
        {
          image:chartImage,
          width: 500
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
    //this.ObjectPdf.download("reporte.pdf");
  }


  generarGrafica(nombre:string,parametro:string) {
    const labels = this.valores.map(item => item[nombre]);
    const dataValues = this.valores.map(item => parseInt(item[parametro], 10));
    const backgroundColors = dataValues.map(() => this.getRandomColor());
    const data = {
      labels,
      datasets: [{
        label:'Grafica',
        data: dataValues,
        fill:false,
        backgroundColor: backgroundColors, // Color de fondo de las barras
        borderColor: backgroundColors, 
        tension: 0.1
      }]
    }
    const options = {
      scales: {
        x: {
          ticks: {
            color: 'red' // Cambia el color de las etiquetas en el eje X
          }
        },
        y: {
          ticks: {
            color: 'red' // Cambia el color de las etiquetas en el eje Y (opcional)
          }
        }
      }
    };
    
    this.chart = new Chart("chart",{
      type: 'bar' as ChartType,
      data,
      options
    })
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.8)`; // Color aleatorio con opacidad
  }
  

}
