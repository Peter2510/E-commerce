import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDeComprasComponent } from './carrito-de-compras.component';

describe('CarritoDeComprasComponent', () => {
  let component: CarritoDeComprasComponent;
  let fixture: ComponentFixture<CarritoDeComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoDeComprasComponent]
    });
    fixture = TestBed.createComponent(CarritoDeComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
