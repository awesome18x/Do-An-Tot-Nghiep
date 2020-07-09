import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucbenhvienComponent } from './danhmucbenhvien.component';

describe('DanhmucbenhvienComponent', () => {
  let component: DanhmucbenhvienComponent;
  let fixture: ComponentFixture<DanhmucbenhvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucbenhvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucbenhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
