import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitadoProductosComponent } from './litado-productos.component';

describe('LitadoProductosComponent', () => {
  let component: LitadoProductosComponent;
  let fixture: ComponentFixture<LitadoProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LitadoProductosComponent]
    });
    fixture = TestBed.createComponent(LitadoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
