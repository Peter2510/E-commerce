import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProductoFiltroComponent } from './listado-producto-filtro.component';

describe('ListadoProductoFiltroComponent', () => {
  let component: ListadoProductoFiltroComponent;
  let fixture: ComponentFixture<ListadoProductoFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoProductoFiltroComponent]
    });
    fixture = TestBed.createComponent(ListadoProductoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
