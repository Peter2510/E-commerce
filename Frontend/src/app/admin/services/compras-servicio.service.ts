import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { tipopermiso } from 'src/app/interfaces/permisos.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ComprasServicioService {
  readonly directiva = 'compras';
  token = this.cookie.get('token');
  public compras = signal<any[]>([]);

  constructor(private cookie: CookieService, private http: HttpClient) {
    this.obtenerCompras();
  }

  //funcion para obtener los permispos

  obtenerCompras() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/compras`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      })
      .pipe(
        map((elemento: any) => {
          console.log(elemento), this.compras.set(elemento.compras);
        })
      )
      .subscribe();
  }
}
