import { TestBed } from '@angular/core/testing';

import { HsphieukhamService } from './hsphieukham.service';

describe('HsphieukhamService', () => {
  let service: HsphieukhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HsphieukhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
