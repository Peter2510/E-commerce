import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  categoria,
  Marca,
  Producto,
} from 'src/app/interfaces/producto.interface';
import { ClienteService } from '../../services/cliente.service';
import { CarritoComprasService } from '../../services/carrito-compras.service';

@Component({
  selector: 'app-listado-producto-filtro',
  templateUrl: './listado-producto-filtro.component.html',
  styleUrls: ['./listado-producto-filtro.component.css'],
})
export class ListadoProductoFiltroComponent {
  products!: Producto[];
  nombre: string = '';
  tipo: string = '';
  vacio: boolean = false;
  idMarca!: number;
  idCategoria!: number;
  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private carritoService: CarritoComprasService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerCategorias();
    this.obtenerMarcas();

    this.route.queryParamMap.subscribe((queryParams) => {
      this.tipo = queryParams.get('tipo')!;
      this.nombre = queryParams.get('name')!;
      if (this.tipo == 'Categoria') {
        this.obtenerProductos(id);
      } else {
        this.obtenerProductosMarca(id);
      }
    });
  }

  obtenerProductos(id: number) {
    this.clienteService.listarProductosCategoria(id).subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.productos)) {
          this.products = response.productos as Producto[];
          console.log(this.products);
          this.vacio = false;
        } else {
          console.error('Estructura inesperada en la respuesta:', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.vacio = true;
      },
    });
  }

  obtenerProductosMarca(id: number) {
    this.clienteService.listarProductosCategoria(id).subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.productos)) {
          this.products = response.productos as Producto[];
          this.vacio = false;
        } else {
          console.error('Estructura inesperada en la respuesta:', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.vacio = true;
      },
    });
  }

  obtenerProdMarcaCategoria(idMarca: number, idCategoria: number) {
    this.clienteService
      .listarProductosMarcaCategoria(idMarca, idCategoria)
      .subscribe({
        next: (response: any) => {
          if (response.ok && Array.isArray(response.productos)) {
            this.products = response.productos as Producto[];
            this.vacio = false;
          } else {
            console.error('Estructura inesperada en la respuesta:', response);
          }
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
          this.vacio = true;
        },
      });
  }

  categorias: categoria[] = [];
  marcas: Marca[] = [];

  obtenerCategorias() {
    this.clienteService.getCategorias().subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.categorias)) {
          this.categorias = response.categorias as categoria[];
          this.categorias.forEach((element) => {
            console.log(element);
          });
        } else {
          console.error('Estructura inesperada en la respuesta:', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      },
    });
  }

  obtenerMarcas() {
    this.clienteService.getMarcas().subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.marcas)) {
          this.marcas = response.marcas as Marca[];
          this.marcas.forEach((element) => {
            console.log(element);
          });
        } else {
          console.error('Estructura inesperada en la respuesta:', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      },
    });
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;
    console.log('Categoría seleccionada:', selectedValue);
    //this.obtenerProdMarcaCategoria(selectedValue)
    // Aquí puedes ejecutar cualquier lógica adicional que necesites
    this.idCategoria = parseInt(selectedValue);
    if (this.idMarca === undefined && this.idCategoria != undefined) {
      this.obtenerProductos(this.idCategoria);
    } else if (this.idCategoria === 0) {
      this.obtenerProductosMarca(this.idMarca);
    } else {
      this.obtenerProdMarcaCategoria(this.idMarca, this.idCategoria);
    }
  }

  onBrandChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;
    console.log('Marca seleccionada:', selectedValue);
    this.idMarca = parseInt(selectedValue);
    if (this.idCategoria === undefined && this.idMarca != undefined) {
      this.obtenerProductosMarca(this.idMarca);
    } else if (this.idMarca === 0) {
      this.obtenerProductos(this.idCategoria);
      //return;
    } else {
      this.obtenerProdMarcaCategoria(this.idMarca, this.idCategoria);
    }
  }
}
