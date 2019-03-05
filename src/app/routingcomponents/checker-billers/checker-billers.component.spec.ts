import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerBillersComponent } from './checker-billers.component';

describe('CheckerBillersComponent', () => {
  let component: CheckerBillersComponent;
  let fixture: ComponentFixture<CheckerBillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerBillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
