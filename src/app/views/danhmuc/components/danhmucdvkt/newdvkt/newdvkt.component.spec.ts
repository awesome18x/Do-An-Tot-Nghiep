import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdvktComponent } from './newdvkt.component';

describe('NewdvktComponent', () => {
  let component: NewdvktComponent;
  let fixture: ComponentFixture<NewdvktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdvktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdvktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
