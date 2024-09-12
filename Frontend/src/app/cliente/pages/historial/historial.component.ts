import { Component,OnInit} from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, Margins,PageSize} from 'pdfmake/interfaces';
import { firstValueFrom, Observable } from 'rxjs';
import Swal from 'sweetalert2';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  constructor(private servicio2: ClienteService) {
  }
  cabeceras: string[] = []
  valores: any[] = [];
  subtotal = 0
  total = 0
  iva = 0
  detalleCompra:any[] = []
  infoEmpresa!:any
  base64Image!: string;

  ngOnInit(): void {
    this.iniciar()
  }

  async iniciar():Promise<void>{
    this.generar()
    const info = await this.servicio2.obtenerInfoEmpresa()
    this.infoEmpresa = info[0]
    this.servicio2.getUrl(this.infoEmpresa.nombre).subscribe({
      next:(response:any)=>{
        this.base64Image = response.base64
      }
    })
  }

  recibirCompra(opciones:any){
    this.servicio2.actualizarEstadoCompra(opciones.id,3).subscribe({
      next:(response:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'OK',
          text: 'Pedido recibido :)',
        });
        this.ngOnInit()
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.mensaje || "error",
        });
      }
    })
  }

  generar() {
    this.servicio2.getCompras().subscribe({
      next: (response: any) => {
        let arreglo: any[] = response.compras
        if (response.compras && response.compras.length > 0) {
          let primero = arreglo[0]
          this.cabeceras = Object.keys(primero)
          this.valores = arreglo.map(item => ({
            id: item.id,
            nit: item.nit,
            precioTotal: item.precioTotal,
            fecha: this.formatearFecha(item.fecha),
            recargo: item.recargo,
            direccionEntrega: item.direccionEntrega,
            usuario: item.usuario.nombreUsuario,
            estadoCompra: item.estadoCompra.estado,
            idEstadoCompra: item.estadoCompra.id,
            formaEntrega: item.formaEntrega.tipo,
          }))
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  formatearFecha(fechatmp: string) {
    const fecha = new Date(fechatmp);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  async generarFactura(opciones:any):Promise<void> {
    await this.obtenerDetalle(opciones.id) 
    const documentDefinition = {
      pageSize: 'A4' as PageSize,
      content: [
        {
          text: 'FACTURA',
          style: 'header',
          alignment: 'center' as Alignment
        }, {
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
                text: `Fecha: ${this.formatearFecha(opciones.fecha)}`,
                alignment: 'right' as Alignment
              },
              {
                text: `Factura No: ${opciones.id}`,
                alignment: 'right' as Alignment
              }
            ]
          ]
        },
        {
          text: '\nInformación del Cliente',
          style: 'subheader'
        },
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              ['Nombre del Cliente', 'Dirección', 'NIT'],
              [`${opciones.usuario}`, `${opciones.direccionEntrega}`, `${opciones.nit}`]
            ]
          },
          margin: [0, 10, 0, 10] as Margins
        },
        {
          text: 'Detalles de la Factura',
          style: 'subheader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Descripción', bold: true }, { text: 'Cantidad', bold: true }, { text: 'Precio Unitario', bold: true }, { text: 'Total', bold: true }],
              ...this.detalleCompra.map(item => [
                item.descripcion,
                item.cantidadProducto,
                `$${item.precioUnitario}`,
                `$${item.precioTotal}`
              ])
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 10] as Margins
        },
        {
          columns: [
            { text: 'Gracias por su compra!', alignment: 'left' as Alignment},
            {
              stack: [
                {
                  table: {
                    widths: ['*', 'auto'],
                    body: [
                      ['Subtotal', `Q${opciones.precioTotal}`],
                      ['Recargo (10%)', `$${opciones.recargo}`],
                      ['Total', { text: `$${(parseFloat(opciones.precioTotal) + parseFloat(opciones.recargo)).toFixed(2)}`, bold: true }]
                    ]
                  },
                  layout: 'noBorders'
                }
              ],
              alignment: 'right' as Alignment
            }
          ]
        }
      ]
    };
    try {
      pdfMake.createPdf(documentDefinition).open();
      
    } catch (error) {
    console.log(error);
    }
  }

  async obtenerDetalle(id:number):Promise<void>{
    try {
      const response: any = await firstValueFrom(this.servicio2.getDetalleCompras(id));
      let arreglo: any[] = response.detalleCompra;
      if (response.detalleCompra && response.detalleCompra.length > 0) {
        this.detalleCompra = arreglo.map(item => ({
          cantidadProducto: item.cantidadProducto,
          precioUnitario: item.precioUnitario,
          precioTotal: item.precioTotal,
          descripcion: item.producto.nombre,
        }));
      }
    } catch (error) {
      console.error('Error obteniendo el detalle:', error);
    }
  }

}
