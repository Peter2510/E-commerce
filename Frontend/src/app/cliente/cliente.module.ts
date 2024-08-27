import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { LitadoProductosComponent } from './pages/litado-productos/litado-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CarritoDeComprasComponent } from './pages/carrito-de-compras/carrito-de-compras.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    LitadoProductosComponent,
    PerfilComponent,
    WelcomeComponent,
    CarritoDeComprasComponent,
    DetalleProductoComponent,
  ],
  imports: [CommonModule, ClienteRoutingModule, FormsModule],
  providers: [CookieService],
})
export class ClienteModule {}
