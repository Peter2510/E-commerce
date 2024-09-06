import { TestBed } from '@angular/core/testing';

import { ProductosServicioService } from './productos-servicio.service';

describe('ProductosServicioService', () => {
  let service: ProductosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
