import { Component, OnInit } from '@angular/core';
import { BuzonService } from '../../services/buzon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buzon-general',
  templateUrl: './buzon-general.component.html',
  styleUrls: ['./buzon-general.component.css']
})
export class BuzonGeneralComponent implements OnInit {

  constructor(private buzonService: BuzonService) { }
  buzones: any[] = [];

  ngOnInit(): void {
    this.buzonService.obtenerBuzonEspecifico().subscribe((res:any)=>{
      this.buzones = res.buzones;
      console.log(res);
    }
    )
  }

  marcarLeido(id:any){

    this.buzonService.marcarLeido(id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: 'Mensaje marcado como leido',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: (err:any)=>{
        Swal.fire({
          title: 'Error al marcar como leido',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    })

    }

  }

