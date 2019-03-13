import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingrulesComponent } from './pendingrules.component';

describe('PendingrulesComponent', () => {
  let component: PendingrulesComponent;
  let fixture: ComponentFixture<PendingrulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingrulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
