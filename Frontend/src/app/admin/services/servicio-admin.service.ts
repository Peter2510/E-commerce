import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  token = this.cookieService.get('token');

  //elementos basico - signals
  public categorias = signal<any[]>([]);
  public marcas = signal<Marca[]>([]);

  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) {
    this.obtenerCategorias();
    this.obtenerMarcas();
  }

  //funcion para obtner los tipos de roles
  obtenerRoles(): Observable<tipoUsuario[]> {
    return this.http.get<tipoUsuario[]>(
      `${environment.baseUrlEnv}/${this.directiva}/getTipoUsuarios`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para obtener formas de pago
  obtenerFormasPago(): Observable<formaPago[]> {
    return this.http.get<formaPago[]>(
      `${environment.baseUrlEnv}/${this.directiva}/getFormasPago`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para obtener empleados
  obtenerEmpleados(): Observable<tipoUsuario[]> {
    return this.http.get<tipoUsuario[]>(
      `${environment.baseUrlEnv}/${this.directiva}/obtenerEmpleados`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para obtener admins por id
  obtenerEmpleadosId(id: number): Observable<Person> {
    return this.http.get<Person>(
      `${environment.baseUrlEnv}/${this.directiva}/obtenerAdminPorId/` + id,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  // ob obtenerAyudantePorId
  obtenerAyudantePorId(id: number): Observable<Person> {
    return this.http.get<Person>(
      `${environment.baseUrlEnv}/${this.directiva}/obtenerAyudantePorId/` + id,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }
  //funcion para la creacion de mas tipos de roles

  crearRoles(tipo: string): Observable<tipoUsuario> {
    const token = this.cookieService.get('token');

    return this.http.post<tipoUsuario>(
      `${environment.baseUrlEnv}/${this.directiva}/crearTipoUsuario`,
      { tipo: tipo },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para crear usuarios

  crearUsuario(
    nombreUsuario: string,
    contrasenia: string,
    persona: Person,
    idTipoUsuario: number
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
        idTipoUsuario: idTipoUsuario,
        persona: persona,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para obetener las marcas

  obtenerMarcas() {
    this.http
      .get<Marca[]>(
        `${environment.baseUrlEnv}/${this.directivaMarcas}/obtenerMarcas`,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
        }
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
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
        }
      )
      .pipe(
        tap((response: any) => {
          this.categorias.set(response.categorias);
        })
      )
      .subscribe();
  }

  // CRUD DE ELEMENTOS DE CATEGORIAS Y MARCAS

  creacionCategoria(nombreCategoria: string, imagen: File) {
    const formData = new FormData();
    formData.append('nombreCategoria', nombreCategoria);
    formData.append('imagen', imagen);
    return this.http.post<categoria>(
      `${environment.baseUrlEnv}/${this.directivaCategoria}/crearCategoria/`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  creacionMarca(nombreMarca: string, imagen: File) {
    const formData = new FormData();
    formData.append('nombreMarca', nombreMarca);
    formData.append('imagen', imagen);
    return this.http.post<categoria>(
      `${environment.baseUrlEnv}/${this.directivaMarcas}/crearMarca/`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }
  //funcion para actualizar las categorias actualizarCategoria
  actualizarCategoria(id: number | undefined, nombre: string, imagen: File) {
    const formData = new FormData();
    formData.append('nuevoNombre', nombre);
    formData.append('nuevaImagen', imagen);
    this.http
      .put(
        `${environment.baseUrlEnv}/${this.directivaCategoria}/actualizarCategoria/${id}`,
        formData,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
        }
      )
      .subscribe();
  }

  //funcion para actualizar las marcas actualizarMarca
  actualizarMarca(id: number | undefined, nombre: string, imagen: File) {
    const formData = new FormData();
    formData.append('nuevoNombre', nombre);
    formData.append('nuevaImagen', imagen);
    return this.http.put(
      `${environment.baseUrlEnv}/${this.directivaMarcas}/actualizarMarca/${id}`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para elminar las categorias actualizarCategoria
  eliminarCategoria(id: number | undefined) {
    return this.http.delete(
      `${environment.baseUrlEnv}/${this.directivaCategoria}/eliminarCategoria/${id}`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para elminar las marcas actualizarCategoria
  eliminarMarca(id: number | undefined) {
    return this.http.delete(
      `${environment.baseUrlEnv}/${this.directivaMarcas}/eliminarMarca/${id}`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //para dar baja
  darBaja(id: number | undefined) {
    return this.http.put(
      `${environment.baseUrlEnv}/${this.directiva}/darBaja/${id}`,
      { withCredentials: true },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //editar usuario
  editarAdmin(a2fActivo:any){
    const idUsuario = this.authService.getIdUsuario();
    const body = {idUsuario, a2fActivo}
    return this.http.post(
      `${environment.baseUrlEnv}/${this.directiva}/editarAdmin`, body,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    )
  }

  //editarContresenia
  actualizarContrasenia(contraseniaActual:string,nuevaContrasenia:string){
    const id = this.authService.getIdUsuario();
    const body = {id,contraseniaActual,nuevaContrasenia}
    return this.http.post(`${environment.baseUrlEnv}/${this.directiva}/actualizarContrasenia-admin`,body,
    {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)})
  }

  //get a2f activo state
  getA2fActivo(){
    const id = this.authService.getIdUsuario();
    return this.http.get(`${environment.baseUrlEnv}/${this.directiva}/obtenerA2F/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    })
  }


}
