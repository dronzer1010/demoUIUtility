import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerPaymentListComponent } from './maker-payment-list.component';

describe('MakerPaymentListComponent', () => {
  let component: MakerPaymentListComponent;
  let fixture: ComponentFixture<MakerPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
