import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillPaymentsComponent } from './view-bill-payments.component';

describe('ViewBillPaymentsComponent', () => {
  let component: ViewBillPaymentsComponent;
  let fixture: ComponentFixture<ViewBillPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
