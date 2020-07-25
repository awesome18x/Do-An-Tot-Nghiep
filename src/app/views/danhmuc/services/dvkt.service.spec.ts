import { TestBed } from '@angular/core/testing';

import { DvktService } from './dvkt.service';

describe('DvktService', () => {
  let service: DvktService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvktService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
