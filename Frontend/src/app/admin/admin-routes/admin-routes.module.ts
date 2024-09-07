import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionRolesComponent } from '../gestion-roles/gestion-roles.component';
import { VistaGeneralComponent } from '../vista-general/vista-general.component';
import { GestionInventarioComponent } from '../gestion-inventario/gestion-inventario.component';
import { GestionRolesEspecificoComponent } from '../gestion-roles-especifico/gestion-roles-especifico.component';
import { GestionProductosComponent } from '../gestion-productos/gestion-productos.component';
import { GestionProductosEspecificaComponent } from '../gestion-productos-especifica/gestion-productos-especifica.component';
import { GestionMarcasCategoriasComponent } from '../gestion-marcas-categorias/gestion-marcas-categorias.component';
import { CreacionProductosComponent } from '../productos/creacion-productos/creacion-productos.component';
import { EdicionProductosComponent } from '../productos/edicion-productos/edicion-productos.component';
import { GestorEnvioComponent } from '../Paquetes/gestor-envio/gestor-envio.component';
import { EditarInformacionComponent } from '../empresa/editar-informacion/editar-informacion.component';

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
        path: 'gestionMarcasCategorias',
        component: GestionMarcasCategoriasComponent,
      },
      {
        path: 'gestionProductosEspecifico/:id',
        component: GestionProductosEspecificaComponent,
      },

      {
        path: 'crearProducto',
        component: CreacionProductosComponent,
      },
      {
        path: 'editarProducto/:id',
        component: EdicionProductosComponent,
      },
      {
        path: 'gestionEnvios',
        component: GestorEnvioComponent,
      },
      {
        path: 'gestionEmpresa',
        component: EditarInformacionComponent,
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
