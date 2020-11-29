import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIcdComponent } from './create-icd.component';

describe('CreateIcdComponent', () => {
  let component: CreateIcdComponent;
  let fixture: ComponentFixture<CreateIcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
