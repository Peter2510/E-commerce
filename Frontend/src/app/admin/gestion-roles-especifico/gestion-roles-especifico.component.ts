import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioAdminService } from '../services/servicio-admin.service';
import { Person } from 'src/app/interfaces/person.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-gestion-roles-especifico',
  templateUrl: './gestion-roles-especifico.component.html',
  styleUrls: ['./gestion-roles-especifico.component.css'],
})
export class GestionRolesEspecificoComponent implements OnInit {
  @Input('id') productId = '';
  //injectamos esto porque v16 no jala con input
  public route = inject(ActivatedRoute);
  id!: number;

  //persona
  persona!: Person;
  usuario!: User;

  //servicio
  servicio = inject(ServicioAdminService);

  obtenerPersona(id: number) {
    this.servicio.obtenerEmpleadosId(id).subscribe((personaFinal: any) => {
      console.log(personaFinal);

      this.persona = personaFinal.persona;
      this.usuario = personaFinal.usuario;
    });
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerPersona(this.id);
  }
}
