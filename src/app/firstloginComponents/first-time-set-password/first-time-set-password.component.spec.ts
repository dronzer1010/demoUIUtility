import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeSetPasswordComponent } from './first-time-set-password.component';

describe('FirstTimeSetPasswordComponent', () => {
  let component: FirstTimeSetPasswordComponent;
  let fixture: ComponentFixture<FirstTimeSetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeSetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
