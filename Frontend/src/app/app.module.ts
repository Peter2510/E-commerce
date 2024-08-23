import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { CookieService } from 'ngx-cookie-service';
import { ClienteModule } from './cliente/cliente.module';
import { HeaderComponent } from './utils/header/header.component';
import { AdminModuleModule } from './admin/admin-module/admin-module.module';
import { AdminheaderComponent } from './utils/adminheader/adminheader.component';
import { RouterLink } from '@angular/router';
import { GestionCriticaComponent } from './admin/gestion-critica/gestion-critica.component';
import { GestionProductosComponent } from './admin/gestion-productos/gestion-productos.component';
import { GestionProductosEspecificaComponent } from './admin/gestion-productos-especifica/gestion-productos-especifica.component';
import { CarritoDeComprasComponent } from './carrito-de-compras/carrito-de-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionCriticaComponent,
    GestionProductosComponent,
    GestionProductosEspecificaComponent,
    CarritoDeComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AuthModule,
    AdminModuleModule,
    HeaderComponent,
    RouterLink,
    AdminheaderComponent,
    ClienteModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
