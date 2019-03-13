import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingcardsComponent } from './pendingcards.component';

describe('PendingcardsComponent', () => {
  let component: PendingcardsComponent;
  let fixture: ComponentFixture<PendingcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
