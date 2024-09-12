import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInventarioComponent } from './gestion-inventario.component';

describe('GestionInventarioComponent', () => {
  let component: GestionInventarioComponent;
  let fixture: ComponentFixture<GestionInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionInventarioComponent]
    });
    fixture = TestBed.createComponent(GestionInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
