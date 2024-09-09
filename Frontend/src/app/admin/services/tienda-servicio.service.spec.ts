import { TestBed } from '@angular/core/testing';

import { TiendaServicioService } from './tienda-servicio.service';

describe('TiendaServicioService', () => {
  let service: TiendaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiendaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
