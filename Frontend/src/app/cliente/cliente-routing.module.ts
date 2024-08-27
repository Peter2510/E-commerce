import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { clienteGuardGuard } from './guard/cliente-guard.guard';
import { LitadoProductosComponent } from './pages/litado-productos/litado-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [clienteGuardGuard],
    children: [
      {
        path: 'listado',
        component: LitadoProductosComponent,
        // canActivate:[clienteGuardGuard]
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        // canActivate:[clienteGuardGuard]
      },
      {
        path: '**',
        component: WelcomeComponent,
        //canActivate:[clienteGuardGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
