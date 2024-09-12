import { TestBed } from '@angular/core/testing';

import { PermisosServiciosService } from './permisos-servicios.service';

describe('PermisosServiciosService', () => {
  let service: PermisosServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
