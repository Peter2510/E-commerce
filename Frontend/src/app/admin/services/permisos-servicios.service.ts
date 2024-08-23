import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { tipopermiso } from 'src/app/interfaces/permisos.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PermisosServiciosService {
  readonly directiva = 'permisos';

  //signlas
  public permisos = signal<tipopermiso[]>([]);

  constructor(private http: HttpClient) {
    this.obtenerPermisos();
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
}
