import { TestBed } from '@angular/core/testing';

import { HsphieuchidinhdvktService } from './hsphieuchidinhdvkt.service';

describe('HsphieuchidinhdvktService', () => {
  let service: HsphieuchidinhdvktService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HsphieuchidinhdvktService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
