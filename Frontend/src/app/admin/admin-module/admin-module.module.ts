import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionRolesComponent } from '../gestion-roles/gestion-roles.component';
import { VistaGeneralComponent } from '../vista-general/vista-general.component';
import { AdminRoutesModule } from '../admin-routes/admin-routes.module';
import { HeaderComponent } from 'src/app/utils/header/header.component';
import { AdminheaderComponent } from 'src/app/utils/adminheader/adminheader.component';

@NgModule({
  declarations: [GestionRolesComponent, VistaGeneralComponent],
  imports: [CommonModule, AdminRoutesModule, AdminheaderComponent],
})
export class AdminModuleModule {}
