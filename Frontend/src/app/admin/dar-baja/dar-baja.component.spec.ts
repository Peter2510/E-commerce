import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarBajaComponent } from './dar-baja.component';

describe('DarBajaComponent', () => {
  let component: DarBajaComponent;
  let fixture: ComponentFixture<DarBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DarBajaComponent]
    });
    fixture = TestBed.createComponent(DarBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
