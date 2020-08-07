import { TestBed } from '@angular/core/testing';

import { CongkhamService } from './congkham.service';

describe('CongkhamService', () => {
  let service: CongkhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongkhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
