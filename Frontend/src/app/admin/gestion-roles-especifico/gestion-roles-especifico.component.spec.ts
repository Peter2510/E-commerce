import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRolesEspecificoComponent } from './gestion-roles-especifico.component';

describe('GestionRolesEspecificoComponent', () => {
  let component: GestionRolesEspecificoComponent;
  let fixture: ComponentFixture<GestionRolesEspecificoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRolesEspecificoComponent]
    });
    fixture = TestBed.createComponent(GestionRolesEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
