import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionProductosComponent } from './edicion-productos.component';

describe('EdicionProductosComponent', () => {
  let component: EdicionProductosComponent;
  let fixture: ComponentFixture<EdicionProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicionProductosComponent]
    });
    fixture = TestBed.createComponent(EdicionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
