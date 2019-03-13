import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinggroupsComponent } from './pendinggroups.component';

describe('PendinggroupsComponent', () => {
  let component: PendinggroupsComponent;
  let fixture: ComponentFixture<PendinggroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendinggroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendinggroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
