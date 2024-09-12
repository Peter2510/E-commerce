import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostarRegistroLogsComponent } from './mostar-registro-logs.component';

describe('MostarRegistroLogsComponent', () => {
  let component: MostarRegistroLogsComponent;
  let fixture: ComponentFixture<MostarRegistroLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostarRegistroLogsComponent]
    });
    fixture = TestBed.createComponent(MostarRegistroLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
