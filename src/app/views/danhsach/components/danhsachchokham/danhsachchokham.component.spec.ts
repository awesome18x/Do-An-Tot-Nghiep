import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachchokhamComponent } from './danhsachchokham.component';

describe('DanhsachchokhamComponent', () => {
  let component: DanhsachchokhamComponent;
  let fixture: ComponentFixture<DanhsachchokhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachchokhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachchokhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
