import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileCheckerComponent } from './myprofile-checker.component';

describe('MyprofileCheckerComponent', () => {
  let component: MyprofileCheckerComponent;
  let fixture: ComponentFixture<MyprofileCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
