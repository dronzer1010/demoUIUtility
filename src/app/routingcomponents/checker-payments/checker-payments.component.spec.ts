import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerPaymentsComponent } from './checker-payments.component';

describe('CheckerPaymentsComponent', () => {
  let component: CheckerPaymentsComponent;
  let fixture: ComponentFixture<CheckerPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
