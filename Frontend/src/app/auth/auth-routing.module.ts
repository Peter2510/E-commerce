import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        //canActivate: [loginGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        // canActivate: [loginGuard]
      },
      {
        path: '**',
        component: LoginComponent,
        // canActivate: [loginGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}