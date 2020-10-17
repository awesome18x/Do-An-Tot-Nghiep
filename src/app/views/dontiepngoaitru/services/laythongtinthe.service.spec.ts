import { TestBed } from '@angular/core/testing';

import { LaythongtintheService } from './laythongtinthe.service';

describe('LaythongtintheService', () => {
  let service: LaythongtintheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaythongtintheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
