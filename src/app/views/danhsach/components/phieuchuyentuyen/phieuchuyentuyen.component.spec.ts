import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuchuyentuyenComponent } from './phieuchuyentuyen.component';

describe('PhieuchuyentuyenComponent', () => {
  let component: PhieuchuyentuyenComponent;
  let fixture: ComponentFixture<PhieuchuyentuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuchuyentuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuchuyentuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
