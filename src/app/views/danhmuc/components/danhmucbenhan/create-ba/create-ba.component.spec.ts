import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaComponent } from './create-ba.component';

describe('CreateBaComponent', () => {
  let component: CreateBaComponent;
  let fixture: ComponentFixture<CreateBaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
