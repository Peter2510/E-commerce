import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { formaPago, Person } from 'src/app/interfaces/person.interface';
import { tipoUsuario } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServicioAdminService {
  readonly directiva = 'administracion';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

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
}
