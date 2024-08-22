import { Component, inject, OnInit } from '@angular/core';
import { ServicioAdminService } from '../services/servicio-admin.service';

@Component({
  selector: 'app-gestion-marcas-categorias',
  templateUrl: './gestion-marcas-categorias.component.html',
  styleUrls: ['./gestion-marcas-categorias.component.css'],
})
export class GestionMarcasCategoriasComponent implements OnInit {
  servicio = inject(ServicioAdminService);
  categoria = this.servicio.categorias;
  marcastotal = this.servicio.marcas;
  elementoSeleccionado: string = 'Marcas';
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectItem(item: any) {
    this.elementoSeleccionado = item;
    console.log(this.isDropdownOpen, this.elementoSeleccionado);

    this.isDropdownOpen = false;
    // Optionally, handle filtering or other logic here
  }
  ngOnInit() {
    console.log(this.elementoSeleccionado);
  }
}
