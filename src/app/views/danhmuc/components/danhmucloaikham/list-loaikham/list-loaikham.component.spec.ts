import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoaikhamComponent } from './list-loaikham.component';

describe('ListLoaikhamComponent', () => {
  let component: ListLoaikhamComponent;
  let fixture: ComponentFixture<ListLoaikhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoaikhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoaikhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
