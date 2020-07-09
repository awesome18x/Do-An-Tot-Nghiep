import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdontiepComponent } from './danhsachdontiep.component';

describe('DanhsachdontiepComponent', () => {
  let component: DanhsachdontiepComponent;
  let fixture: ComponentFixture<DanhsachdontiepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachdontiepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdontiepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
