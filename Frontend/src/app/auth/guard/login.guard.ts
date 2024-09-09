import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class Guardia {
  constructor(private cookie: CookieService, private router: Router,private servicio:AuthService) {}
  Comprobar(ruta: String, route: ActivatedRouteSnapshot): boolean {
    const cookie = this.cookie.get('token');
    if (cookie) {
      const idTipoUsuario = this.servicio.getIdTipoUsuario()
      if (idTipoUsuario == 1 || idTipoUsuario == 3) {
        this.router.navigate(['/admin']);
      } else if (idTipoUsuario == 2) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/admin']);
      }
      console.log('la cookie ya existe');
      return false;
    } else {
      console.log('no existe');

      return true;
    }
  }
}
export const loginGuard: CanActivateFn = (route, state) => {
  return inject(Guardia).Comprobar(state.url, route);
};
