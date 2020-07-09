import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhuykhamComponent } from './danhsachhuykham.component';

describe('DanhsachhuykhamComponent', () => {
  let component: DanhsachhuykhamComponent;
  let fixture: ComponentFixture<DanhsachhuykhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhuykhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhuykhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
