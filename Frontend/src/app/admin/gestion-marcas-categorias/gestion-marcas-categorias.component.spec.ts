import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMarcasCategoriasComponent } from './gestion-marcas-categorias.component';

describe('GestionMarcasCategoriasComponent', () => {
  let component: GestionMarcasCategoriasComponent;
  let fixture: ComponentFixture<GestionMarcasCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMarcasCategoriasComponent]
    });
    fixture = TestBed.createComponent(GestionMarcasCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
