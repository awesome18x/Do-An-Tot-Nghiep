import { TestBed } from '@angular/core/testing';

import { DanhsachdontiepService } from './danhsachdontiep.service';

describe('DanhsachdontiepService', () => {
  let service: DanhsachdontiepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhsachdontiepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
