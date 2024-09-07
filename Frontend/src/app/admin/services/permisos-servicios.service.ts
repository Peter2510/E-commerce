import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import {
  permisousuario,
  tipopermiso,
} from 'src/app/interfaces/permisos.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PermisosServiciosService {
  readonly directiva = 'permisos';

  //signlas
  public permisos = signal<tipopermiso[]>([]);
  public permisosNuevos = signal<tipopermiso[]>([]);

  public permisosUsuario = signal<tipopermiso[]>([]);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {
    this.obtenerPermisos();
    //this.obtenerPermisosUsuario(JSON.parse(this.cookie.get('token2')).id);
  }

  //funcion para obtener los permispos

  obtenerPermisos() {
    this.http
      .get<tipopermiso[]>(
        `${environment.baseUrlEnv}/${this.directiva}/obtenerPermisos`,
        { withCredentials: true }
      )
      .pipe(
        map((elemento: any) => {
          console.log(elemento.permisos), this.permisos.set(elemento.permisos);
        })
      )
      .subscribe();
  }

  obtenerPermisosUsuario(id: number | undefined): Observable<tipopermiso[]> {
    return this.http.get<tipopermiso[]>(
      `${environment.baseUrlEnv}/${this.directiva}/obtenerPermisosUsuario/${id}`,
      { withCredentials: true }
    );
  }
  guardarRoles(roles: tipopermiso[], id: number) {
    this.http
      .post(
        `${environment.baseUrlEnv}/${this.directiva}/guardarPermisos/${id}`,
        { permisosUsuarioArray: roles },
        { withCredentials: true }
      )
      .subscribe();
  }
}
