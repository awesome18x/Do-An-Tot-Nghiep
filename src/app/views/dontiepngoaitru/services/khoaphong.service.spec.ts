import { TestBed } from '@angular/core/testing';

import { KhoaphongService } from './khoaphong.service';

describe('KhoaphongService', () => {
  let service: KhoaphongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoaphongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
