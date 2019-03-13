import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardunitaryComponent } from './cardunitary.component';

describe('CardunitaryComponent', () => {
  let component: CardunitaryComponent;
  let fixture: ComponentFixture<CardunitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardunitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardunitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
