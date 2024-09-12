import {
  AfterContentInit,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import 'datatables.net';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gestor-envio',
  templateUrl: './gestor-envio.component.html',
  styleUrls: ['./gestor-envio.component.css'],
})
export class GestorEnvioComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(
      this.comprasServicio.comprasPendientes()
    );

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: any) => {
      return data.usuario.persona.nombre.toLowerCase().includes(filter);
    };

    //tabla 2
    this.dataSourceEmpacado = new MatTableDataSource(
      this.comprasServicio.comprasEmpacadas()
    );

    this.dataSourceEmpacado.paginator = this.paginatorEmpacado;
    this.dataSourceEmpacado.sort = this.sortEmpacado;
    this.dataSourceEmpacado.filterPredicate = (data: any, filter: any) => {
      return data.usuario.persona.nombre.toLowerCase().includes(filter);
    };
    //tabla 3
    this.dataSourceEntregado = new MatTableDataSource(
      this.comprasServicio.comprasEntregadas()
    );

    this.dataSourceEntregado.paginator = this.paginatorEntregado;
    this.dataSourceEntregado.sort = this.sortEntregado;
    this.dataSourceEntregado.filterPredicate = (data: any, filter: any) => {
      return data.usuario.persona.nombre.toLowerCase().includes(filter);
    };
    //tabla 4
    this.dataSourceCancelado = new MatTableDataSource(
      this.comprasServicio.comprasCanceladas()
    );

    this.dataSourceCancelado.paginator = this.paginatorCancelado;
    this.dataSourceCancelado.sort = this.sortCancelado;
    this.dataSourceCancelado.filterPredicate = (data: any, filter: any) => {
      return data.usuario.persona.nombre.toLowerCase().includes(filter);
    };
  }
  searchTerm: string = ''; // Almacena el término de búsqueda
  filteredUsers: any[] = []; // Almacena los usuarios filtrados
  compras: any[] = [];
  paginatedUsers!: any[];

  currentPage: number = 1;
  totalPages: number = 1;

  displayedColumns: string[] = [
    'index',
    'nombre',
    'nit',
    'direccionEntrega',
    'precioTotal',
    'recargo',
    'estadoCompra',
    'formaEntrega',
    'fecha',
    'verCompra',
  ];
  //tabla 1
  dataSource = new MatTableDataSource<any[]>([]); // Tu fuente de datos
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //tabla 1

  dataSourceEmpacado = new MatTableDataSource<any[]>([]); // Tu fuente de datos
  pageSizeEmpacado = 5;
  @ViewChild(MatPaginator) paginatorEmpacado!: MatPaginator;
  @ViewChild(MatSort) sortEmpacado!: MatSort;
  //tabla 3
  dataSourceEntregado = new MatTableDataSource<any[]>([]); // Tu fuente de datos
  pageSizeEntregado = 5;
  @ViewChild(MatPaginator) paginatorEntregado!: MatPaginator;
  @ViewChild(MatSort) sortEntregado!: MatSort;
  //tabla 4
  dataSourceCancelado = new MatTableDataSource<any[]>([]); // Tu fuente de datos
  pageSizeCancelado = 5;
  @ViewChild(MatPaginator) paginatorCancelado!: MatPaginator;
  @ViewChild(MatSort) sortCancelado!: MatSort;
  // para el modal
  elementoSeleccionado!: string;
  isModalVisible = false;
  enProceso!: boolean;
  //servicio
  comprasServicio = inject(ComprasServicioService);

  openModal(tipo: boolean, elemento: any) {
    this.enProceso = tipo;
    this.isModalVisible = true;
    this.elementoSeleccionado = elemento;
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }

  ngOnInit() {
    this.applyFilter(); 
    
  }

  applyFilter() {
    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.comprasServicio
      .filteredCompras()
      .slice(start, end);

    this.totalPages = Math.ceil(
      this.comprasServicio.filteredCompras().length / this.pageSize
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  // Función para actualizar el término de búsqueda
  setSearchTerm(valor: Event | null) {
    this.paginar();

    const inputElement = valor?.target as HTMLInputElement;
    this.comprasServicio.searchTerm.set(inputElement.value);
    if (inputElement.value == '') {
      this.dataSource = new MatTableDataSource(
        this.comprasServicio.comprasPendientes()
      );
    }
    this.dataSource = new MatTableDataSource(
      this.comprasServicio.filteredCompras()
    );
  }

  filtado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Resetea la paginación al buscar
    }
  }

  filtadoEmpacado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEmpacado.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEmpacado.paginator) {
      this.dataSourceEmpacado.paginator.firstPage(); // Resetea la paginación al buscar
    }
  }
  filtadoEntregado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEntregado.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEntregado.paginator) {
      this.dataSourceEntregado.paginator.firstPage(); // Resetea la paginación al buscar
    }
  }
  filtadoCancelado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCancelado.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCancelado.paginator) {
      this.dataSourceCancelado.paginator.firstPage(); // Resetea la paginación al buscar
    }
  }
  ponerValorEmpacado(valor: Event | null) {
    const inputElement = valor?.target as HTMLInputElement;
    this.comprasServicio.textoEmpacado.set(inputElement.value);
  }
  ponerValorEntregado(valor: Event | null) {
    const inputElement = valor?.target as HTMLInputElement;
    this.comprasServicio.textoEntregado.set(inputElement.value);
  }
  ponerValorCancelado(valor: Event | null) {
    const inputElement = valor?.target as HTMLInputElement;
    this.comprasServicio.textoCancelar.set(inputElement.value);
  }
  paginar() {
    this.comprasServicio.currentPage.set(1);
  }
}
