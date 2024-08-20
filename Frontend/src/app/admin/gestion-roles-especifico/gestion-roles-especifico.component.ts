import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-roles-especifico',
  templateUrl: './gestion-roles-especifico.component.html',
  styleUrls: ['./gestion-roles-especifico.component.css'],
})
export class GestionRolesEspecificoComponent implements OnInit {
  @Input('id') productId = '';
  //injectamos esto porque v16 no jala con input
  public route = inject(ActivatedRoute);
  id!: Number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      console.log(this.id);
    }
  }
}
