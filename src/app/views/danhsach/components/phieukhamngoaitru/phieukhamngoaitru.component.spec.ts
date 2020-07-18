import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieukhamngoaitruComponent } from './phieukhamngoaitru.component';

describe('PhieukhamngoaitruComponent', () => {
  let component: PhieukhamngoaitruComponent;
  let fixture: ComponentFixture<PhieukhamngoaitruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieukhamngoaitruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieukhamngoaitruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
