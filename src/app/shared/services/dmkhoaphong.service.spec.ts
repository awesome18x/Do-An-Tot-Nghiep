import { TestBed } from '@angular/core/testing';

import { DmkhoaphongService } from './dmkhoaphong.service';

describe('DmkhoaphongService', () => {
  let service: DmkhoaphongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmkhoaphongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
