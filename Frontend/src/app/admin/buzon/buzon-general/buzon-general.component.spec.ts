import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonGeneralComponent } from './buzon-general.component';

describe('BuzonGeneralComponent', () => {
  let component: BuzonGeneralComponent;
  let fixture: ComponentFixture<BuzonGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuzonGeneralComponent]
    });
    fixture = TestBed.createComponent(BuzonGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
