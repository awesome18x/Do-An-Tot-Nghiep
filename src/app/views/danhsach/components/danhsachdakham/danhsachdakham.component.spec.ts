import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdakhamComponent } from './danhsachdakham.component';

describe('DanhsachdakhamComponent', () => {
  let component: DanhsachdakhamComponent;
  let fixture: ComponentFixture<DanhsachdakhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachdakhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdakhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
