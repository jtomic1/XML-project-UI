import { TestBed } from '@angular/core/testing';

import { AutorksaPravaFormValidatorService } from './autorksa-prava-form-validator.service';

describe('AutorksaPravaFormValidatorService', () => {
  let service: AutorksaPravaFormValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorksaPravaFormValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
