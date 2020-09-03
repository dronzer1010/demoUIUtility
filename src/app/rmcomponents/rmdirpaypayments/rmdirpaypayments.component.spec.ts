import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmdirpaypaymentsComponent } from './rmdirpaypayments.component';

describe('RmdirpaypaymentsComponent', () => {
  let component: RmdirpaypaymentsComponent;
  let fixture: ComponentFixture<RmdirpaypaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmdirpaypaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmdirpaypaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
