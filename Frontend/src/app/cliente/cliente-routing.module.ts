import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { clienteGuardGuard } from './guard/cliente-guard.guard';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CarritoDeComprasComponent } from './pages/carrito-de-compras/carrito-de-compras.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { ListadoProductoFiltroComponent } from './pages/listado-producto-filtro/listado-producto-filtro.component';
import { ProcederPagoComponent } from './pages/proceder-pago/proceder-pago.component';
import { BuscarComponent } from './pages/buscar/buscar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [clienteGuardGuard],
    children: [
      {
        path: 'listado',
        component: ListadoProductosComponent,
        canActivate: [clienteGuardGuard],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [clienteGuardGuard],
      },
      {
        path: 'carrito-compras',
        component: CarritoDeComprasComponent,
        canActivate: [clienteGuardGuard],
      },
      {
        path: 'producto/:id',
        component: DetalleProductoComponent,
        canActivate: [clienteGuardGuard],
      },
      {
        path: 'producto-categoria/:id',
        component: ListadoProductoFiltroComponent,
        canActivate: [clienteGuardGuard],
      },
      {
        path: 'proceder-pago',
        component: ProcederPagoComponent,
        canActivate: [clienteGuardGuard],
      },
      {
        path: 'buscar',
        component: BuscarComponent,
        //canActivate: [clienteGuardGuard],
      },
      {
        path: '**',
        component: WelcomeComponent,
        canActivate: [clienteGuardGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
