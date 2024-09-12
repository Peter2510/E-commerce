import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { tienda } from 'src/app/interfaces/tienda.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TiendaServicioService {
  readonly directiva = 'tienda';

  //signal
  public infoEmpresa = signal<any>('');

  public isLoading = signal<boolean>(true);
  productosActivos: any;
  token = this.cookie.get('token');

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private login: AuthService
  ) {
    this.obtenerInfoEmpresa();
  }

  obtenerInfoEmpresa() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/obtenerElementos/`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      })
      .pipe(
        tap((valores: any) => {
          console.log(valores.tienda[0]),
            this.infoEmpresa.set(valores.tienda[0]);
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }
  editarEmpresa(
    tienda: tienda,
    password: string,
    imagen: File,
    imagenActualCambiar: string
  ) {
    const datos = new FormData();
    datos.append('tienda', JSON.stringify(tienda));
    datos.append('password', password);

    const idUsuario = this.login.getIdUsuario();

    if (idUsuario != null) {
      datos.append('idUsuario', idUsuario.toString());
    }

    datos.append('imagenCambiar', imagen);
    datos.append('imagenActualCambiar', imagenActualCambiar);
    return this.http.put(
      `${environment.baseUrlEnv}/${this.directiva}/editarEmpresa/`,
      datos,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }
  guardarInfoEmpresa(tienda: tienda, imagen: File) {
    const datos = new FormData();
    datos.append('tienda', JSON.stringify(tienda));
    datos.append('imagen', imagen);
    return this.http.post(
      `${environment.baseUrlEnv}/${this.directiva}/crearTienda/`,
      datos,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  getInfoTienda() {
    return this.http.get(`${environment.baseUrlEnv}/tienda/obtenerElementos/`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      })
  }

}
