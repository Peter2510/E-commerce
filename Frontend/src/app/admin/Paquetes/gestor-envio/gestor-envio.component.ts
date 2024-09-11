import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ComprasServicioService } from '../../services/compras-servicio.service';

@Component({
  selector: 'app-gestor-envio',
  templateUrl: './gestor-envio.component.html',
  styleUrls: ['./gestor-envio.component.css'],
})
export class GestorEnvioComponent implements OnInit {
  searchTerm: string = ''; // Almacena el término de búsqueda
  filteredUsers: any[] = []; // Almacena los usuarios filtrados
  compras: any[] = [];
  paginatedUsers!: any[];

  currentPage: number = 1;
  pageSize: number = 1; // Número de elementos por página
  totalPages: number = 1;

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
    this.compras.push(this.comprasServicio.comprasPorEstadoCompra(1));
    this.comprasServicio.comprasPorEstadoCompra(2);
    this.comprasServicio.comprasPorEstadoCompra(3);
    this.comprasServicio.comprasPorEstadoCompra(4);
    this.applyFilter(); // Inicializar tabla
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
