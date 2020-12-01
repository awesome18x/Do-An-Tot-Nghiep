import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoaikhamComponent } from './create-loaikham.component';

describe('CreateLoaikhamComponent', () => {
  let component: CreateLoaikhamComponent;
  let fixture: ComponentFixture<CreateLoaikhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLoaikhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoaikhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
