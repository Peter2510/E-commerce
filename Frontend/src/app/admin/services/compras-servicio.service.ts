import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
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
  public comprasCanceladas = signal<any[]>([]);
  public paginatedCompras = signal<any[]>([]);
  public paginatedCompras2 = signal<any[]>([]);
  public comprasPendientes = signal<any[]>([]);
  public comprasEmpacadas = signal<any[]>([]);
  public comprasEntregadas = signal<any[]>([]);

  // para un filtrado
  searchTerm = signal<string>('');
  textoEmpacado = signal<string>('');
  textoEntregado = signal<string>('');
  textoCancelar = signal<string>('');

  // para el paginator
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  pageSize = signal<number>(10);

  filteredCompras = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.comprasPendientes().filter((compra) =>
      compra.usuario.persona.nombre.toLowerCase().includes(search)
    );
  });

  comprasBusquedaEmpacada = computed(() => {
    const search = this.textoEmpacado().toLowerCase();
    return this.comprasEmpacadas().filter((compra) =>
      compra.usuario.persona.nombre.toLowerCase().includes(search)
    );
  });
  comprasBusquedaEntregada = computed(() => {
    const search = this.textoEntregado().toLowerCase();
    return this.comprasEntregadas().filter((compra) =>
      compra.usuario.persona.nombre.toLowerCase().includes(search)
    );
  });
  comprasBusquedaCancelada = computed(() => {
    const search = this.textoCancelar().toLowerCase();
    return this.comprasCanceladas().filter((compra) =>
      compra.usuario.persona.nombre.toLowerCase().includes(search)
    );
  });

  // para ponerle el valor
  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  fetchCompras() {
    // Fetch data and set comprasPendientes
    this.paginar();
    this.actualizarTotalPages();
    this.comprasPorEstadoCompra(1);
    this.comprasPorEstadoCompra(2);
    this.comprasPorEstadoCompra(3);
    this.comprasPorEstadoCompra(4);
  }

  paginar() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    this.paginatedCompras2.set(this.filteredCompras().slice(start, end));
  }

  actualizarTotalPages() {
    const total = this.filteredCompras().length;
    this.totalPages.set(Math.ceil(total / this.pageSize()));
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.paginar();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.paginar();
    }
  }

  constructor(private cookie: CookieService, private http: HttpClient) {
    this.obtenerCompras();
    this.fetchCompras();
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

  obtenerCompraDetalle(idCompra: number) {
    return this.http.get(
      `${environment.baseUrlEnv}/${this.directiva}/compraYDetalleCompra/${idCompra}`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }
  ///api/v1/compras/comprasPorEstadoCompra/{idEstadoCompra}
  comprasPorEstadoCompra(idEstadoCompra: number) {
    return this.http
      .get(
        `${environment.baseUrlEnv}/${this.directiva}/comprasPorEstadoCompra/${idEstadoCompra}`,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
        }
      )
      .pipe(
        map((elemento: any) => {
          switch (idEstadoCompra) {
            case 1:
              console.log(elemento),
                this.comprasPendientes.set(elemento.compras);
              break;
            case 2:
              console.log(elemento),
                this.comprasEmpacadas.set(elemento.compras);
              break;
            case 3:
              console.log(elemento),
                this.comprasEntregadas.set(elemento.compras);
              break;
            case 4:
              console.log(elemento),
                this.comprasCanceladas.set(elemento.compras);
              break;
          }
        })
      )
      .subscribe();
  }

  //funcion para actualizar estados /api/v1/compras/actualizarEstadoCompra
  actualizarEstadoCompra(idCompra: number, tipo: number) {
    const datos = new FormData();
    datos.append('idCompra', idCompra.toString());
    datos.append('idEstadoCompra', tipo.toString());
    this.http
      .patch(
        `${environment.baseUrlEnv}/${this.directiva}/actualizarEstadoCompra`,
        datos,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
        }
      )
      .subscribe();
  }
}
