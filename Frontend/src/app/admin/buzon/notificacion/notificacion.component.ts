import { Component, Input, OnInit, inject } from '@angular/core';
import { BuzonService } from '../../services/buzon.service';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  public route = inject(ActivatedRoute);

  constructor(private buzonService: BuzonService) { }
  id_notificacion: any;
  notificacion: any;

  ngOnInit(): void {
    this.id_notificacion = Number(this.route.snapshot.paramMap.get('id'));

    this.buzonService.obtenerNotificacion(this.id_notificacion).subscribe({
      next: (response: any) => {
        this.notificacion = response.notificacion;
        this.buzonService.marcarLeido(this.id_notificacion).subscribe({
          next: (response: any) => {
            
          },
          error: (error: HttpErrorResponse) => {
            
          }
        });
      },
      error: (error:HttpErrorResponse) => {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'No se pudo obtener la notificación'
        });
      }
    }
    )
  }



}
