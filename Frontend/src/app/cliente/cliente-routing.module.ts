import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { clienteGuardGuard } from './guard/cliente-guard.guard';

const routes: Routes = [{
  path:'',
  component:HomeComponent,
  canActivate:[clienteGuardGuard],
  children: [
    {
      path: '**',
      component: HomeComponent,
      canActivate:[clienteGuardGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
