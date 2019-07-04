import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrulevalidationComponent } from './rmrulevalidation.component';

describe('RmrulevalidationComponent', () => {
  let component: RmrulevalidationComponent;
  let fixture: ComponentFixture<RmrulevalidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrulevalidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrulevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
