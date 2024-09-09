import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user.interface';
import { ClienteService } from '../../services/cliente.service';
import { Person } from 'src/app/interfaces/person.interface';
import { ComprasService } from '../../services/compras.service';
import { Pedido } from '../../../interfaces/pedido.interface';
import { ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { CarritoComprasService } from '../../services/carrito-compras.service';

@Component({
  selector: 'app-proceder-pago',
  templateUrl: './proceder-pago.component.html',
  styleUrls: ['./proceder-pago.component.css']
})
export class ProcederPagoComponent implements OnInit {

  user!: User;
  metodoEntrega: string = 'domicilio'; // Default selection
  direccionEnvio: string = '';
  nitOption: string = 'registrado';
  nitRegistrado: string = ''; // Inicializar vacía por defecto
  nuevoNit: string = '';
  direccionFacturacionOption: string = 'registrada';
  direccionFacturacionRegistrada: string = ''; // Inicializar vacía por defecto
  nuevaDireccionFacturacion: string = '';

  constructor(private clienteService: ClienteService,
              private comprasService: ComprasService,
              private carritoService: CarritoComprasService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  procederAlPago() {
    const datos = {
      metodoEntrega: this.metodoEntrega,
      direccionEnvio: this.metodoEntrega === 'domicilio' ? this.direccionEnvio : null,
      nit: this.nitOption === 'registrado' ? this.nitRegistrado : this.nuevoNit,
      direccionFacturacion: this.direccionFacturacionOption === 'registrada' ? this.direccionFacturacionRegistrada : this.nuevaDireccionFacturacion,
    };

    console.log('Datos de facturación y entrega:', datos);
    const pedido: Pedido = {
      idUsuario: this.user.id!,
      nit: datos.nit,
      direccionEntrega: datos.direccionEnvio!,
      idFormaEntrega: 2,
      productos: this.carritoService.getProductosPedido(),
      
    }
    console.log('Pedido:', pedido);

    // Aquí llamarías al servicio para proceder al pago, enviando los datos
    this.clienteService.registrarCompra(pedido).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servicio:', response);
      }
    })
    
  }

  getUser() {
    this.clienteService.getCliente().subscribe({
      next: (response: any) => {
        this.user = response.usuario as User;
        this.user.persona = response.persona as Person;

        // Inicializa las propiedades dependientes de `this.user` después de recibir los datos
        this.nitRegistrado = this.user?.nombreUsuario || '';
        this.direccionFacturacionRegistrada = this.user.persona.direccion; // Ajustar según sea necesario

        console.log('user is ', this.user);
        console.log('persona is ', this.user.persona);
      },
      error: (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    });
  }
}
