import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProductosEspecificaComponent } from './gestion-productos-especifica.component';

describe('GestionProductosEspecificaComponent', () => {
  let component: GestionProductosEspecificaComponent;
  let fixture: ComponentFixture<GestionProductosEspecificaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProductosEspecificaComponent]
    });
    fixture = TestBed.createComponent(GestionProductosEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
