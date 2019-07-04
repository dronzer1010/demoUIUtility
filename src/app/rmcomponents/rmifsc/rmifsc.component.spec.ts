import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmifscComponent } from './rmifsc.component';

describe('RmifscComponent', () => {
  let component: RmifscComponent;
  let fixture: ComponentFixture<RmifscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmifscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmifscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
