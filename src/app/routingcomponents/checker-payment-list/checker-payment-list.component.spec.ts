import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerPaymentListComponent } from './checker-payment-list.component';

describe('CheckerPaymentListComponent', () => {
  let component: CheckerPaymentListComponent;
  let fixture: ComponentFixture<CheckerPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
