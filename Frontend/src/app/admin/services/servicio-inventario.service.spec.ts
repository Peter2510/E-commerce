import { TestBed } from '@angular/core/testing';

import { ServicioInventarioService } from './servicio-inventario.service';

describe('ServicioInventarioService', () => {
  let service: ServicioInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
