import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionEspecificaEmpresaComponent } from './edicion-especifica-empresa.component';

describe('EdicionEspecificaEmpresaComponent', () => {
  let component: EdicionEspecificaEmpresaComponent;
  let fixture: ComponentFixture<EdicionEspecificaEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicionEspecificaEmpresaComponent]
    });
    fixture = TestBed.createComponent(EdicionEspecificaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
