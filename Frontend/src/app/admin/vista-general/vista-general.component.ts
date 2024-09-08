import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReporteGeneral } from 'src/app/interfaces/reporteGeneral.interface';

@Component({
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrls: ['./vista-general.component.css']
})
export class VistaGeneralComponent implements OnInit{

  constructor(private reportesService: ReportesService ) {
    
   }

  reportes: ReporteGeneral[] = [];

  ngOnInit(): void {

    this.reportesService.obtenerReporteGeneral().subscribe({
      next:(response:any)=>{
          this.reportes = response.reporte;
          console.log(this.reportes);


      }, error:(error:HttpErrorResponse)=>{
        console.error(error);
      }
    })

  }

}
