import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { LitadoProductosComponent } from './pages/litado-productos/litado-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    LitadoProductosComponent,
    PerfilComponent,
    WelcomeComponent  
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule
  ],
  providers:[CookieService]
})
export class ClienteModule { }
