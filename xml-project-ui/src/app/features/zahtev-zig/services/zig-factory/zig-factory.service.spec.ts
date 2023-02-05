import { TestBed } from '@angular/core/testing';

import { ZigFactoryService } from './zig-factory.service';

describe('ZigFactoryService', () => {
  let service: ZigFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZigFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
