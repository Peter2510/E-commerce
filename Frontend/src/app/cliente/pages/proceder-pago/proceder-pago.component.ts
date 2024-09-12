import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user.interface';
import { ClienteService } from '../../services/cliente.service';
import { Person } from 'src/app/interfaces/person.interface';
import { ComprasService } from '../../services/compras.service';
import { Pedido } from '../../../interfaces/pedido.interface';
import { ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { CarritoComprasService } from '../../services/carrito-compras.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  cantProd = this.carritoService.getCantidadItems();
  total = this.carritoService.getTotal();
  mostrarModal: boolean = false;
  recargo: number=0.0;
  idFormaEntrega!: number;
  toastr: any;

  constructor(
    private clienteService: ClienteService,
    private comprasService: ComprasService,
    private carritoService: CarritoComprasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.getIdUsuario()!=null) {
      this.getUser();
    }else{
      this.router.navigate(['/auth/login'])
      return;
    }
    
  }

  procederAlPago() {
    // Validar si es servicio a domicilio y si la dirección es obligatoria
    if (this.metodoEntrega === 'domicilio' && !this.direccionEnvio) {
      alert('La dirección de envío es obligatoria para el servicio a domicilio.');
      return;
    }

    

    const datos = {
      metodoEntrega: this.metodoEntrega,
      direccionEnvio: this.metodoEntrega === 'domicilio' ? this.direccionEnvio : null,
      nit: this.nitOption === 'registrado' ? this.nitRegistrado : this.nuevoNit,
      direccionFacturacion: this.direccionFacturacionOption === 'registrada' ? this.direccionFacturacionRegistrada : this.nuevaDireccionFacturacion,
    };

    // Asignar idFormaEntrega según el método de entrega
    
    if (this.metodoEntrega === 'domicilio') {
      this.idFormaEntrega = 2;
  
    }else{
      this.idFormaEntrega = 1;
      datos.direccionEnvio='Recoger tienda'
    }
    

    const pedido: Pedido = {
      idUsuario: this.user.id!,
      nit: datos.nit,
      direccionEntrega: datos.direccionEnvio! || 'Recoger tienda',
      idFormaEntrega: this.idFormaEntrega,
      productos: this.carritoService.getProductosPedido(),
    };

    console.log('Pedido:', pedido);

    // Llamar al servicio para proceder al pago
    this.clienteService.registrarCompra(pedido).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servicio:', response);
        Swal.fire({
          icon: 'success',
          title: 'Compra exitos ',
          text: "Puede ver el estado de su pedido, el el apartado pedidos ",
        });
      },
      error: (error: any) => {
        console.error('Error al registrar la compra:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al realizar la compra ',
          text: error ,
        });
      }
    });
  }

  getUser() {
    this.clienteService.getCliente().subscribe({
      next: (response: any) => {
        this.user = response.usuario as User;
        this.user.persona = response.persona as Person;

        // Inicializa las propiedades dependientes de `this.user` después de recibir los datos
        this.nitRegistrado = this.user?.persona.nit || 'C/F';
        this.direccionFacturacionRegistrada = this.user.persona.direccion || 'ciudad'; // Ajustar según sea necesario

        console.log('user is ', this.user);
        console.log('persona is ', this.user.persona);
      },
      error: (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    });
  }

  abrirConfirmacion() {
    // Aplicar recargo del 10% si el servicio es a domicilio
    if (this.metodoEntrega === 'domicilio') {
      this.recargo = this.carritoService.getTotal() * 0.10; // Agregar 10% al total
      this.total = this.carritoService.getTotal() * 1.10; // Agregar 10% al total
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarCompra() {
    // Lógica para procesar la compra
    this.procederAlPago();

    // Cerrar el modal
    this.mostrarModal = false;
    this.carritoService.limpiarCarrito();

    // Mostrar mensaje de éxito
    //debemos redirigir a la ventana pedidos
    
    this.router.navigate(['/cliente/historial'])
    alert('Su compra ha sido procesada. Total de productos: ' + this.cantProd + '. Total: ' + this.total);
  }
}
