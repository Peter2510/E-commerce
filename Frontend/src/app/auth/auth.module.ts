import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from '../utils/header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminheaderComponent } from '../utils/adminheader/adminheader.component';
import { RecuperarContraseniaComponent } from './pages/recuperar-contrasenia/recuperar-contrasenia.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecuperarContraseniaComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
