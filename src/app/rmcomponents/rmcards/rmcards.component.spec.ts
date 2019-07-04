import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcardsComponent } from './rmcards.component';

describe('RmcardsComponent', () => {
  let component: RmcardsComponent;
  let fixture: ComponentFixture<RmcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
