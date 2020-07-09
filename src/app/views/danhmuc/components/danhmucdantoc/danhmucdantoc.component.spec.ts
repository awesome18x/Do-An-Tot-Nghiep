import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucdantocComponent } from './danhmucdantoc.component';

describe('DanhmucdantocComponent', () => {
  let component: DanhmucdantocComponent;
  let fixture: ComponentFixture<DanhmucdantocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucdantocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucdantocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
