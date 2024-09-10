import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ComprasServicioService } from '../../services/compras-servicio.service';

@Component({
  selector: 'app-gestor-envio',
  templateUrl: './gestor-envio.component.html',
  styleUrls: ['./gestor-envio.component.css'],
})
export class GestorEnvioComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  filteredUsers: Array<{ id: number; name: string; email: string }> = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5; // Número de elementos por página
  totalPages: number = 1;

  //servicio
  comprasServicio = inject(ComprasServicioService);

  ngOnInit() {
    // Simulación de datos (puedes obtener estos datos de un servicio API)
    this.users = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
      { id: 2, name: 'María Gómez', email: 'maria@example.com' },
      { id: 3, name: 'Carlos Sánchez', email: 'carlos@example.com' },
      { id: 4, name: 'Laura Díaz', email: 'laura@example.com' },
      { id: 5, name: 'Pedro Fernández', email: 'pedro@example.com' },
      { id: 6, name: 'Ana García', email: 'ana@example.com' },
      { id: 7, name: 'Luis Torres', email: 'luis@example.com' },
      { id: 8, name: 'Eva Ramírez', email: 'eva@example.com' },
      { id: 9, name: 'Sofía Martínez', email: 'sofia@example.com' },
      { id: 10, name: 'David Rojas', email: 'david@example.com' },
    ];

    this.applyFilter(); // Inicializar tabla
  }

  applyFilter() {
    // Filtrar usuarios por nombre
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
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
}
