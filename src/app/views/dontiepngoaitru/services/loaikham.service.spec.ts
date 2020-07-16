import { TestBed } from '@angular/core/testing';

import { LoaikhamService } from './loaikham.service';

describe('LoaikhamService', () => {
  let service: LoaikhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaikhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
