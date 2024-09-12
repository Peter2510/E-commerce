import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { GestionProductosComponent } from './admin/gestion-productos/gestion-productos.component';
import { GestionProductosEspecificaComponent } from './admin/gestion-productos-especifica/gestion-productos-especifica.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EliminarProductoComponent } from './admin/productos/eliminar-producto/eliminar-producto.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { CommonModule } from '@angular/common';
import { DarBajaComponent } from './admin/dar-baja/dar-baja.component';
import { TokenInterceptorService } from './auth/services/token-interceptor.service';
import { CompraEspecificaComponent } from './admin/Paquetes/compra-especifica/compra-especifica.component';
import { BuzonGeneralComponent } from './admin/buzon/buzon-general/buzon-general.component';
import { NotificacionComponent } from './admin/buzon/notificacion/notificacion.component';
import { PerfilComponent } from './admin/perfil/perfil.component';
@NgModule({
  declarations: [
    AppComponent,
    GestionProductosComponent,
    GestionProductosEspecificaComponent,
    EliminarProductoComponent,
    ReportesComponent,
    BuzonGeneralComponent,
    NotificacionComponent,
    PerfilComponent,
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
    ClienteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
