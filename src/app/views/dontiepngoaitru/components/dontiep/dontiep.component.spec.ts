import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DontiepComponent } from './dontiep.component';

describe('DontiepComponent', () => {
  let component: DontiepComponent;
  let fixture: ComponentFixture<DontiepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DontiepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DontiepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
