import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CarritoDeComprasComponent } from './pages/carrito-de-compras/carrito-de-compras.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

import { FormsModule } from '@angular/forms';
import { ProductoCardComponent } from './pages/producto-card/producto-card.component';
import { ListadoProductoFiltroComponent } from './pages/listado-producto-filtro/listado-producto-filtro.component';
import { ProcederPagoComponent } from './pages/proceder-pago/proceder-pago.component';

import { BuscarComponent } from './pages/buscar/buscar.component';
import { MaterialModule } from '../material/material.module';
import { HistorialComponent } from './pages/historial/historial.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListadoProductosComponent,
    PerfilComponent,
    WelcomeComponent,
    CarritoDeComprasComponent,
    DetalleProductoComponent,
    ProductoCardComponent,
    ListadoProductoFiltroComponent,
    ProcederPagoComponent,
    BuscarComponent,
    HistorialComponent,
  ],
  imports: [CommonModule, ClienteRoutingModule, FormsModule, MaterialModule],
  providers: [CookieService],
})
export class ClienteModule {}
