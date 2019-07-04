import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmprofileComponent } from './rmprofile.component';

describe('RmprofileComponent', () => {
  let component: RmprofileComponent;
  let fixture: ComponentFixture<RmprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
