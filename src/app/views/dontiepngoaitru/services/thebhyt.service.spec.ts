import { TestBed } from '@angular/core/testing';

import { ThebhytService } from './thebhyt.service';

describe('ThebhytService', () => {
  let service: ThebhytService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThebhytService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
