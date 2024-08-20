import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionRolesComponent } from '../gestion-roles/gestion-roles.component';
import { VistaGeneralComponent } from '../vista-general/vista-general.component';
import { GestionInventarioComponent } from '../gestion-inventario/gestion-inventario.component';
import { GestionRolesEspecificoComponent } from '../gestion-roles-especifico/gestion-roles-especifico.component';
import { GestionProductosComponent } from '../gestion-productos/gestion-productos.component';
import { GestionProductosEspecificaComponent } from '../gestion-productos-especifica/gestion-productos-especifica.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gestionRoles',
        component: GestionRolesComponent,
      },
      {
        path: 'gestionRolesEspecifico/:id',
        component: GestionRolesEspecificoComponent,
      },
      {
        path: 'gestionInventario',
        component: GestionInventarioComponent,
      },
      {
        path: 'gestionProductos',
        component: GestionProductosComponent,
      },
      {
        path: 'gestionProductosEspecifico/:id',
        component: GestionProductosEspecificaComponent,
      },
      {
        path: '',
        component: VistaGeneralComponent,
      },

      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesModule {}
