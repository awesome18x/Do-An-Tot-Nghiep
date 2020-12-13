import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucbenhanComponent } from './danhmucbenhan.component';

describe('DanhmucbenhanComponent', () => {
  let component: DanhmucbenhanComponent;
  let fixture: ComponentFixture<DanhmucbenhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucbenhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucbenhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
