import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCriticaComponent } from './gestion-critica.component';

describe('GestionCriticaComponent', () => {
  let component: GestionCriticaComponent;
  let fixture: ComponentFixture<GestionCriticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCriticaComponent]
    });
    fixture = TestBed.createComponent(GestionCriticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
