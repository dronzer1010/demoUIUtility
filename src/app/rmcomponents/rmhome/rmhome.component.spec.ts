import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmhomeComponent } from './rmhome.component';

describe('RmhomeComponent', () => {
  let component: RmhomeComponent;
  let fixture: ComponentFixture<RmhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
