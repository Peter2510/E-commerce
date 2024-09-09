import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ClienteService } from '../../services/cliente.service';
//import { Producto } from '../../Interface/producto.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }
 /* producto1: Producto = {
    id: 12,
    nombre: "Teléfono móvil",
    descripcion: "Teléfono inteligente de última generación",
    precio_dinero_real: 500,
    precio_moneda: 550,
    estado: 2,
    idvendedor: 1,
   // categoria: "Electrónica",
    idestado: 0,
    tipo: '',
    disponible:1
  };
  
   producto2: Producto = {
     id: 12,
     nombre: "Zapatos deportivos",
     descripcion: "Zapatos para correr de alta calidad",
     precio_dinero_real: 80,
     precio_moneda: 90,
     estado: 1,
     idvendedor: 1,
     categoria: "Calzado",
     idestado: 0
     //imagen: "zapatodep",
     ,
     tipo: '',
     disponible: 2
   };*/
  termino: string = '';
  productos: Producto[]=[];
  productosSug: Producto[]=[];
  ngOnInit(){
    this.listar();
  }

  listar(){
    this.clienteService.listarProductosTodos().subscribe({
      next: (data: any) => {
        this.productos = data.productos as Producto[] ;
      }
    });
    this.productosSug = this.productos
  }

  buscando(){
    const textoBusquedaLower = this.termino.toLowerCase();
    
    // Filtrar productos cuyo nombre contenga el texto de búsqueda
    const productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(textoBusquedaLower)
    );
    
    // Devolver las primeras 7 opciones (o menos si hay menos coincidencias)
    this.productosSug = productosFiltrados.slice(0, 7);
    return productosFiltrados.slice(0, 7);

  }


  opcionSelect(event: any){
    const product: Producto = event.option.value;
    this.termino = product.nombre;
    console.log(event.option.value)
    console.log(product.id)
    this.router.navigate(['/cliente/producto', product.id]); 
  }

}