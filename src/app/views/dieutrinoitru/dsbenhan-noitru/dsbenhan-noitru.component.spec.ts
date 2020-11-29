import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsbenhanNoitruComponent } from './dsbenhan-noitru.component';

describe('DsbenhanNoitruComponent', () => {
  let component: DsbenhanNoitruComponent;
  let fixture: ComponentFixture<DsbenhanNoitruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsbenhanNoitruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsbenhanNoitruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
