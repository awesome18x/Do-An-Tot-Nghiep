import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucloaikhamComponent } from './danhmucloaikham.component';

describe('DanhmucloaikhamComponent', () => {
  let component: DanhmucloaikhamComponent;
  let fixture: ComponentFixture<DanhmucloaikhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaikhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaikhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
