import { TestBed } from '@angular/core/testing';

import { TinhthanhService } from './tinhthanh.service';

describe('TinhthanhService', () => {
  let service: TinhthanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinhthanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
