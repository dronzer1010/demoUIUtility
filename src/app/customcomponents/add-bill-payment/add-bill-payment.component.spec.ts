import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillPaymentComponent } from './add-bill-payment.component';

describe('AddBillPaymentComponent', () => {
  let component: AddBillPaymentComponent;
  let fixture: ComponentFixture<AddBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
