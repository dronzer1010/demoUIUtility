import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardviewCheckerComponent } from './cardview-checker.component';

describe('CardviewCheckerComponent', () => {
  let component: CardviewCheckerComponent;
  let fixture: ComponentFixture<CardviewCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardviewCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardviewCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
