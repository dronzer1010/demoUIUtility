import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationmatrixComponent } from './notificationmatrix.component';

describe('NotificationmatrixComponent', () => {
  let component: NotificationmatrixComponent;
  let fixture: ComponentFixture<NotificationmatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationmatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationmatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
