import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdtComponent } from './newdt.component';

describe('NewdtComponent', () => {
  let component: NewdtComponent;
  let fixture: ComponentFixture<NewdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
