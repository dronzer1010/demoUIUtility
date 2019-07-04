import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeprepaidpaymentsComponent } from './makeprepaidpayments.component';

describe('MakeprepaidpaymentsComponent', () => {
  let component: MakeprepaidpaymentsComponent;
  let fixture: ComponentFixture<MakeprepaidpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeprepaidpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeprepaidpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
