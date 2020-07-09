import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucdvktComponent } from './danhmucdvkt.component';

describe('DanhmucdvktComponent', () => {
  let component: DanhmucdvktComponent;
  let fixture: ComponentFixture<DanhmucdvktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucdvktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucdvktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
