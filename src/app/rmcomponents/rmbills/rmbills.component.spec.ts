import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmbillsComponent } from './rmbills.component';

describe('RmbillsComponent', () => {
  let component: RmbillsComponent;
  let fixture: ComponentFixture<RmbillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmbillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
