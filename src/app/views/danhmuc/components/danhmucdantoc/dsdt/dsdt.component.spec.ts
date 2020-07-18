import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdtComponent } from './dsdt.component';

describe('DsdtComponent', () => {
  let component: DsdtComponent;
  let fixture: ComponentFixture<DsdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
