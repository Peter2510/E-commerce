
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class Guardia{
  constructor(private cookie:CookieService,private router:Router){}
  Comprobar(ruta:String,route:ActivatedRouteSnapshot):boolean{
    const cookie = this.cookie.get('token')
    if(cookie) {
      const idTipoUsuario = JSON.parse(cookie).idTipoUsuario
      if (idTipoUsuario == 1) {
        this.router.navigate(['/admin']);
      } else if (idTipoUsuario == 2) {
        this.router.navigate(['/cliente']);
      } else {
        this.router.navigate(['/ayudante']);
      }
      console.log('la cookie ya existe');
      return false
    }
    else{
      console.log('no existe');
      
      return true
    }
  }
}
export const loginGuard: CanActivateFn = (route, state) => {
  return inject(Guardia).Comprobar(state.url,route)
};
