import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuckhoduocComponent } from './danhmuckhoduoc.component';

describe('DanhmuckhoduocComponent', () => {
  let component: DanhmuckhoduocComponent;
  let fixture: ComponentFixture<DanhmuckhoduocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuckhoduocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuckhoduocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
