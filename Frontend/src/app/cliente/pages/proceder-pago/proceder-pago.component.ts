import { Component } from '@angular/core';

@Component({
  selector: 'app-proceder-pago',
  templateUrl: './proceder-pago.component.html',
  styleUrls: ['./proceder-pago.component.css']
})
export class ProcederPagoComponent {
  metodoEntrega: string = 'domicilio'; // Default selection
  direccionEnvio: string = '';

  nitOption: string = 'registrado';
  nitRegistrado: string = '12345678'; // Ejemplo de NIT pre-registrado
  nuevoNit: string = '';

  direccionFacturacionOption: string = 'registrada';
  direccionFacturacionRegistrada: string = 'Calle 123, Ciudad XYZ'; // Dirección registrada
  nuevaDireccionFacturacion: string = '';

  procederAlPago() {
    // Aquí puedes realizar la lógica para enviar los datos al backend
    const datos = {
      metodoEntrega: this.metodoEntrega,
      direccionEnvio: this.metodoEntrega === 'domicilio' ? this.direccionEnvio : null,
      nit: this.nitOption === 'registrado' ? this.nitRegistrado : this.nuevoNit,
      direccionFacturacion: this.direccionFacturacionOption === 'registrada' ? this.direccionFacturacionRegistrada : this.nuevaDireccionFacturacion,
    };

    console.log('Datos de facturación y entrega:', datos);

    // Aquí llamarías al servicio para proceder al pago, enviando los datos
  }
}
