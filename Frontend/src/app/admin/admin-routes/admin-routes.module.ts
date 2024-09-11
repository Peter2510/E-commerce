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
import { ReportesComponent } from '../reportes/reportes.component';
import { EditarInformacionComponent } from '../empresa/editar-informacion/editar-informacion.component';
import { EdicionEspecificaEmpresaComponent } from '../empresa/edicion-especifica-empresa/edicion-especifica-empresa.component';
import { adminGuard } from '../guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gestionRoles',
        component: GestionRolesComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'gestionRolesEspecifico/:id',
        component: GestionRolesEspecificoComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'gestionInventario',
        component: GestionInventarioComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'gestionProductos',
        component: GestionProductosComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'gestionMarcasCategorias',
        component: GestionMarcasCategoriasComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'gestionProductosEspecifico/:id',
        component: GestionProductosEspecificaComponent,
        canActivate: [adminGuard]
      },

      {
        path: 'crearProducto',
        component: CreacionProductosComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'editarProducto/:id',
        component: EdicionProductosComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'gestionEnvios',
        component: GestorEnvioComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        canActivate: [adminGuard]
      },      {
        path: 'gestionEmpresa',
        component: EditarInformacionComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'edicionEmpresa',
        component: EdicionEspecificaEmpresaComponent,
        canActivate: [adminGuard]
      },

      {
        path: '',
        component: VistaGeneralComponent,
        canActivate: [adminGuard]
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
