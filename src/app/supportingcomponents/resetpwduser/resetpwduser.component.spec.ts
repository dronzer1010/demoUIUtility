import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwduserComponent } from './resetpwduser.component';

describe('ResetpwduserComponent', () => {
  let component: ResetpwduserComponent;
  let fixture: ComponentFixture<ResetpwduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpwduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpwduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
