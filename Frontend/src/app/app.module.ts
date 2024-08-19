import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './utils/header/header.component';
import { AdminModuleModule } from './admin/admin-module/admin-module.module';
import { AdminheaderComponent } from './utils/adminheader/adminheader.component';
import { GestionRolesEspecificoComponent } from './admin/gestion-roles-especifico/gestion-roles-especifico.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AppComponent, GestionRolesEspecificoComponent],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
