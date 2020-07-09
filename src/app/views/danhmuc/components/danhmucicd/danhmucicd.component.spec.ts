import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucicdComponent } from './danhmucicd.component';

describe('DanhmucicdComponent', () => {
  let component: DanhmucicdComponent;
  let fixture: ComponentFixture<DanhmucicdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucicdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucicdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
