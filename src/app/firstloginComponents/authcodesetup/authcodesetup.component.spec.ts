import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthcodesetupComponent } from './authcodesetup.component';

describe('AuthcodesetupComponent', () => {
  let component: AuthcodesetupComponent;
  let fixture: ComponentFixture<AuthcodesetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthcodesetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthcodesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
