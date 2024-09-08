import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { tap } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.obtenerInfoEmpresa();
  }

  obtenerInfoEmpresa() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/obtenerElementos/`, {
        withCredentials: true,
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
}
