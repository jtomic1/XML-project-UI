import { TestBed } from '@angular/core/testing';

import { AutorskaPravaService } from './autorska-prava.service';

describe('AutorskaPravaService', () => {
  let service: AutorskaPravaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorskaPravaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
