import { TestBed } from '@angular/core/testing';

import { DschokhamService } from './dschokham.service';

describe('DschokhamService', () => {
  let service: DschokhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DschokhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
