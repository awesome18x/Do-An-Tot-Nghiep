import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsovaovienComponent } from './capsovaovien.component';

describe('CapsovaovienComponent', () => {
  let component: CapsovaovienComponent;
  let fixture: ComponentFixture<CapsovaovienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapsovaovienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsovaovienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
