import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsetupComponent } from './accountsetup.component';

describe('AccountsetupComponent', () => {
  let component: AccountsetupComponent;
  let fixture: ComponentFixture<AccountsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
