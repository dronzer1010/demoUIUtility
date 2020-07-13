import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkBillPaymentComponent } from './add-bulk-bill-payment.component';

describe('AddBulkBillPaymentComponent', () => {
  let component: AddBulkBillPaymentComponent;
  let fixture: ComponentFixture<AddBulkBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
