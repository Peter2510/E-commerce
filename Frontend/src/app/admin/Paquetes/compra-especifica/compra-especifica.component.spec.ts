import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraEspecificaComponent } from './compra-especifica.component';

describe('CompraEspecificaComponent', () => {
  let component: CompraEspecificaComponent;
  let fixture: ComponentFixture<CompraEspecificaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraEspecificaComponent]
    });
    fixture = TestBed.createComponent(CompraEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
