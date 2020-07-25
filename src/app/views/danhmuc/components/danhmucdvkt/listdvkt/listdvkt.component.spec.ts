import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdvktComponent } from './listdvkt.component';

describe('ListdvktComponent', () => {
  let component: ListdvktComponent;
  let fixture: ComponentFixture<ListdvktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdvktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdvktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
