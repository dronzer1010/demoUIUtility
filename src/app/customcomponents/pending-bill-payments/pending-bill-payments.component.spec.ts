import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillPaymentsComponent } from './pending-bill-payments.component';

describe('PendingBillPaymentsComponent', () => {
  let component: PendingBillPaymentsComponent;
  let fixture: ComponentFixture<PendingBillPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBillPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
