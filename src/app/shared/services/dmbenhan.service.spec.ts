import { TestBed } from '@angular/core/testing';

import { DmbenhanService } from './dmbenhan.service';

describe('DmbenhanService', () => {
  let service: DmbenhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmbenhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
