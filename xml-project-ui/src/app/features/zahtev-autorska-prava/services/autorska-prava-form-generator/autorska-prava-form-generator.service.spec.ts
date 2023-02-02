import { TestBed } from '@angular/core/testing';

import { AutorskaPravaFormGeneratorService } from './autorska-prava-form-generator.service';

describe('AutorskaPravaFormGeneratorService', () => {
  let service: AutorskaPravaFormGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorskaPravaFormGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
