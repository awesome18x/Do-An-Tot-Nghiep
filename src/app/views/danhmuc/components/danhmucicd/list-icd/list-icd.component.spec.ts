import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIcdComponent } from './list-icd.component';

describe('ListIcdComponent', () => {
  let component: ListIcdComponent;
  let fixture: ComponentFixture<ListIcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
