import { TestBed } from '@angular/core/testing';

import { AutorskaPravaFactoryService } from './autorska-prava-factory.service';

describe('AutorskaPravaFactoryService', () => {
  let service: AutorskaPravaFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorskaPravaFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
