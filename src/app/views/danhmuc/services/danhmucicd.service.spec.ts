import { TestBed } from '@angular/core/testing';

import { DanhmucicdService } from './danhmucicd.service';

describe('DanhmucicdService', () => {
  let service: DanhmucicdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhmucicdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
