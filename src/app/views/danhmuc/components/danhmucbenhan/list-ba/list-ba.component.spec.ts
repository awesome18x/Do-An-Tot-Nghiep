import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaComponent } from './list-ba.component';

describe('ListBaComponent', () => {
  let component: ListBaComponent;
  let fixture: ComponentFixture<ListBaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
