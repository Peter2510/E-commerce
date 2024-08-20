import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    HomeComponent  
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ],
  providers:[CookieService]
})
export class ClienteModule { }
