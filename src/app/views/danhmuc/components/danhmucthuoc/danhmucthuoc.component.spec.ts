import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucthuocComponent } from './danhmucthuoc.component';

describe('DanhmucthuocComponent', () => {
  let component: DanhmucthuocComponent;
  let fixture: ComponentFixture<DanhmucthuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucthuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
