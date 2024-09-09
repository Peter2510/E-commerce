import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Guardia{
  constructor(private cookie:CookieService,private router:Router,private servicio:AuthService){}
  Comprobar(ruta:String,route:ActivatedRouteSnapshot):boolean{
    const cookie = this.cookie.get('token')
    if(cookie) {
      const idTipoUsuario = this.servicio.getIdTipoUsuario()
      if(idTipoUsuario == 2)
        return true
      else{
        this.router.navigate(['/'])
        return false
      }
    } else{
      this.router.navigate(['/'])
      return false
    }
  }
}

export const clienteGuardGuard: CanActivateFn = (route, state) => {
  return inject(Guardia).Comprobar(state.url,route)
};
