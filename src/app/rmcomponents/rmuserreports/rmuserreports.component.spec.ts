import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmuserreportsComponent } from './rmuserreports.component';

describe('RmuserreportsComponent', () => {
  let component: RmuserreportsComponent;
  let fixture: ComponentFixture<RmuserreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmuserreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmuserreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
