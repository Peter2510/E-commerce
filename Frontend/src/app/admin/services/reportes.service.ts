import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.development';
import { ReporteGeneral } from 'src/app/interfaces/reporteGeneral.interface';

@Injectable({
  providedIn: 'root',
})

export class ReportesService {
  constructor(private http: HttpClient, private cookie: CookieService) { }

  public obtenerReporteGeneral = ()=>{
  
    return this.http.get<ReporteGeneral[]>(`${environment.baseUrlEnv}/administracion/reporteGeneral`, { withCredentials: true });

  }

}



