import { TestBed } from '@angular/core/testing';

import { PatentFormGeneratorService } from './patent-form-generator.service';

describe('PatentFormGeneratorService', () => {
  let service: PatentFormGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatentFormGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
