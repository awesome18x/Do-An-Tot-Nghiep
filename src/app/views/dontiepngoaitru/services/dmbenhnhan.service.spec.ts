import { TestBed } from '@angular/core/testing';

import { DmbenhnhanService } from './dmbenhnhan.service';

describe('DmbenhnhanService', () => {
  let service: DmbenhnhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmbenhnhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
