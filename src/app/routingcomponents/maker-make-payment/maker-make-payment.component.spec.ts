import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerMakePaymentComponent } from './maker-make-payment.component';

describe('MakerMakePaymentComponent', () => {
  let component: MakerMakePaymentComponent;
  let fixture: ComponentFixture<MakerMakePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerMakePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
