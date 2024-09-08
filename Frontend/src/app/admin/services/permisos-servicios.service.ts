import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  public permisosUsuarioIngresado = signal<any>([]);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cookie: CookieService,
    private loginservice: AuthService
  ) {
    this.obtenerPermisosUsuarioIngreado();
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

  private arraysAreDifferent(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return true;

    // Convertir los arrays a JSON strings para compararlos
    const arr1Str = JSON.stringify(arr1);
    const arr2Str = JSON.stringify(arr2);

    return arr1Str !== arr2Str;
  }
  obtenerPermisosUsuarioIngreado() {

    let idUsuario = this.loginservice.getIdUsuario();
    console.log('idUsuario', idUsuario);

    this.http
      .get<tipopermiso[]>(
        `${environment.baseUrlEnv}/${this.directiva}/obtenerPermisosUsuario/${
          idUsuario
        }`,
        { withCredentials: true }
      )
      .pipe(
        map((elemento: any) => {
          // Comprobar si los permisos obtenidos son diferentes a los permisos actuales
          if (
            this.arraysAreDifferent(
              elemento.todosTipos,
              this.permisosUsuarioIngresado()
            )
          ) {
            // Solo actualizar si son diferentes
            this.permisosUsuarioIngresado.set(elemento.todosTipos);
            console.log(
              elemento.todosTipos,
              'aca permisos de logeado',
              elemento.todosTipos[0]?.tipo
            );
          } else {
            console.log('Los permisos no cambiaron');
          }
        })
      )
      .subscribe();
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
