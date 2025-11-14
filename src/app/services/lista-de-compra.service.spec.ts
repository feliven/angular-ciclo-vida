import { TestBed } from '@angular/core/testing';

import { ListaDeCompraService } from './lista-de-compra.service';

describe('ListaDeCompraService', () => {
  let service: ListaDeCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDeCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
