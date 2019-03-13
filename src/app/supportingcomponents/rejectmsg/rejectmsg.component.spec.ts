import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectmsgComponent } from './rejectmsg.component';

describe('RejectmsgComponent', () => {
  let component: RejectmsgComponent;
  let fixture: ComponentFixture<RejectmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
