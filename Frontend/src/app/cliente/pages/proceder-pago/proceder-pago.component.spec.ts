import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcederPagoComponent } from './proceder-pago.component';

describe('ProcederPagoComponent', () => {
  let component: ProcederPagoComponent;
  let fixture: ComponentFixture<ProcederPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcederPagoComponent]
    });
    fixture = TestBed.createComponent(ProcederPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
