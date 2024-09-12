import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorEnvioComponent } from './gestor-envio.component';

describe('GestorEnvioComponent', () => {
  let component: GestorEnvioComponent;
  let fixture: ComponentFixture<GestorEnvioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorEnvioComponent]
    });
    fixture = TestBed.createComponent(GestorEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
