import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmusersComponent } from './rmusers.component';

describe('RmusersComponent', () => {
  let component: RmusersComponent;
  let fixture: ComponentFixture<RmusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
