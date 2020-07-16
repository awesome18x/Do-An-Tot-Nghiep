import { TestBed } from '@angular/core/testing';

import { DantocService } from './dantoc.service';

describe('DantocService', () => {
  let service: DantocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DantocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
