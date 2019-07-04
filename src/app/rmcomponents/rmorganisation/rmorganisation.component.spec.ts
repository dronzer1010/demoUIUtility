import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmorganisationComponent } from './rmorganisation.component';

describe('RmorganisationComponent', () => {
  let component: RmorganisationComponent;
  let fixture: ComponentFixture<RmorganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmorganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmorganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
