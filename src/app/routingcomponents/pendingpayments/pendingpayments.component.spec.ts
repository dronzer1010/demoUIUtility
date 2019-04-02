import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentsComponent } from './pendingpayments.component';

describe('CheckerApprovePaymentsComponent', () => {
  let component: PendingPaymentsComponent;
  let fixture: ComponentFixture<PendingPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
