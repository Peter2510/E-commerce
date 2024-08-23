import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { formaPago, Person } from 'src/app/interfaces/person.interface';
import { categoria, Marca } from 'src/app/interfaces/producto.interface';
import { tipoUsuario } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServicioAdminService {
  //directivas
  readonly directiva = 'administracion';
  readonly directivaCategoria = 'categorias';
  readonly directivaMarcas = 'marcas';

  //elementos basico - signals
  public categorias = signal<any[]>([]);
  public marcas = signal<Marca[]>([]);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.obtenerCategorias();
    this.obtenerMarcas();
  }

  //funcion para obtner los tipos de roles
  obtenerRoles(): Observable<tipoUsuario[]> {
    return this.http.get<tipoUsuario[]>(
      `${environment.baseUrlEnv}/${this.directiva}/getTipoUsuarios`,
      { withCredentials: true }
    );
  }

  //funcion para obtener formas de pago
  obtenerFormasPago(): Observable<formaPago[]> {
    return this.http.get<formaPago[]>(
      `${environment.baseUrlEnv}/${this.directiva}/getFormasPago`,
      { withCredentials: true }
    );
  }

  //funcion para obtener empleados
  obtenerEmpleados(): Observable<tipoUsuario[]> {
    return this.http.get<tipoUsuario[]>(
      `${environment.baseUrlEnv}/${this.directiva}/obtenerEmpleados`,
      { withCredentials: true }
    );
  }

  //funcion para obtener empelados por id
  obtenerEmpleadosId(id: number): Observable<Person> {
    return this.http.get<Person>(
      `${environment.baseUrlEnv}/${this.directiva}/obtenerAdminPorId/` + id,
      { withCredentials: true }
    );
  }

  //funcion para la creacion de mas tipos de roles

  crearRoles(tipo: string): Observable<tipoUsuario> {
    const token = this.cookieService.get('token');

    return this.http.post<tipoUsuario>(
      `${environment.baseUrlEnv}/${this.directiva}/crearTipoUsuario`,
      { tipo: tipo },
      { withCredentials: true }
    );
  }

  //funcion para crear usuarios

  crearUsuario(
    nombreUsuario: string,
    contrasenia: string,
    persona: Person
  ): Observable<tipoUsuario> {
    let forma = {
      nombreUsuario: nombreUsuario,
      contrasenia: contrasenia,
      persona: persona,
    };
    return this.http.post<tipoUsuario>(
      `${environment.baseUrlEnv}/${this.directiva}/crearAdmin`,
      {
        nombreUsuario: nombreUsuario,
        contrasenia: contrasenia,
        persona: persona,
      },
      { withCredentials: true }
    );
  }

  //funcion para obetener las marcas

  obtenerMarcas() {
    this.http
      .get<Marca[]>(
        `${environment.baseUrlEnv}/${this.directivaMarcas}/obtenerMarcas`,
        { withCredentials: true }
      )
      .pipe(
        tap((elementos: any) => {
          console.log('a', elementos.marcas), this.marcas.set(elementos.marcas);
        })
      )
      .subscribe();
  }
  //funcion para obtener las categiruas obtenerCategorias
  obtenerCategorias() {
    this.http
      .get<any[]>(
        `${environment.baseUrlEnv}/${this.directivaCategoria}/obtenerCategorias`,
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          this.categorias.set(response.categorias);
        })
      )
      .subscribe();
  }

  // CRUD DE ELEMENTOS DE CATEGORIAS Y MARCAS
  //funcion para actualizar las categorias actualizarCategoria
  actualizarCategoria(id: number | undefined, nombre: string) {
    this.http
      .put(
        `${environment.baseUrlEnv}/${this.directivaCategoria}/actualizarCategoria/${id}`,
        { id: id, nombreCategoria: nombre },
        { withCredentials: true }
      )
      .subscribe();
  }

  //funcion para actualizar las marcas actualizarMarca
  actualizarMarca(id: number | undefined, nombre: string) {
    return this.http.put(
      `${environment.baseUrlEnv}/${this.directivaMarcas}/actualizarMarca/${id}`,
      { nombreMarca: nombre },
      { withCredentials: true }
    );
  }

  //funcion para elminar las categorias actualizarCategoria
  eliminarCategoria(id: number | undefined) {
    return this.http.delete(
      `${environment.baseUrlEnv}/${this.directivaCategoria}/eliminarCategoria/${id}`,
      { withCredentials: true }
    );
  }

  //funcion para elminar las marcas actualizarCategoria
  eliminarMarca(id: number | undefined) {
    return this.http.delete(
      `${environment.baseUrlEnv}/${this.directivaMarcas}/eliminarMarca/${id}`,
      { withCredentials: true }
    );
  }
}
