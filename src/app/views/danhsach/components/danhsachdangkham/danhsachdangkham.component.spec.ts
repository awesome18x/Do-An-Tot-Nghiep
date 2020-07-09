import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdangkhamComponent } from './danhsachdangkham.component';

describe('DanhsachdangkhamComponent', () => {
  let component: DanhsachdangkhamComponent;
  let fixture: ComponentFixture<DanhsachdangkhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachdangkhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdangkhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
