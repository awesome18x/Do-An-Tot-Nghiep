import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuckhoaphongComponent } from './danhmuckhoaphong.component';

describe('DanhmuckhoaphongComponent', () => {
  let component: DanhmuckhoaphongComponent;
  let fixture: ComponentFixture<DanhmuckhoaphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuckhoaphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuckhoaphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
