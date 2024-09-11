import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionRolesComponent } from '../gestion-roles/gestion-roles.component';
import { VistaGeneralComponent } from '../vista-general/vista-general.component';
import { AdminRoutesModule } from '../admin-routes/admin-routes.module';
import { HeaderComponent } from 'src/app/utils/header/header.component';
import { AdminheaderComponent } from 'src/app/utils/adminheader/adminheader.component';
import { GestionInventarioComponent } from '../gestion-inventario/gestion-inventario.component';
import { GestionRolesEspecificoComponent } from '../gestion-roles-especifico/gestion-roles-especifico.component';
import { FormsModule } from '@angular/forms';
import { GestionMarcasCategoriasComponent } from '../gestion-marcas-categorias/gestion-marcas-categorias.component';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { CreacionProductosComponent } from '../productos/creacion-productos/creacion-productos.component';
import { EdicionProductosComponent } from '../productos/edicion-productos/edicion-productos.component';
import { EditarCantidadComponent } from '../inventario/editar-cantidad/editar-cantidad.component';
import { EliminarProductoComponent } from '../productos/eliminar-producto/eliminar-producto.component';
import { GestorEnvioComponent } from '../Paquetes/gestor-envio/gestor-envio.component';
import { EditarInformacionComponent } from '../empresa/editar-informacion/editar-informacion.component';
import { EdicionEspecificaEmpresaComponent } from '../empresa/edicion-especifica-empresa/edicion-especifica-empresa.component';
import { DarBajaComponent } from '../dar-baja/dar-baja.component';
import { CompraEspecificaComponent } from '../Paquetes/compra-especifica/compra-especifica.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    GestionRolesComponent,
    VistaGeneralComponent,
    GestionInventarioComponent,
    GestionRolesEspecificoComponent,
    GestionMarcasCategoriasComponent,
    ModalEliminarComponent,
    ModalEditarComponent,
    CreacionProductosComponent,
    EdicionProductosComponent,
    EditarCantidadComponent,
    GestorEnvioComponent,
    EditarInformacionComponent,
    EdicionEspecificaEmpresaComponent,
    DarBajaComponent,
    CompraEspecificaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutesModule,
    AdminheaderComponent,
    FormsModule,
    MaterialModule,
  ],
})
export class AdminModuleModule {}
