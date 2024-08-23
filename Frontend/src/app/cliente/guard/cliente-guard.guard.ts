import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Guardia{
  constructor(private cookie:CookieService,private router:Router){}
  Comprobar(ruta:String,route:ActivatedRouteSnapshot):boolean{
    const cookie = this.cookie.get('token2')
    if(cookie) {
      const idTipoUsuario = JSON.parse(cookie).idTipoUsuario
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
