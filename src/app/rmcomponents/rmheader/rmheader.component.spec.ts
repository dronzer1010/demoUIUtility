import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmheaderComponent } from './rmheader.component';

describe('RmheaderComponent', () => {
  let component: RmheaderComponent;
  let fixture: ComponentFixture<RmheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
