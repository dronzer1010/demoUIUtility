import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmracessComponent } from './rmracess.component';

describe('RmracessComponent', () => {
  let component: RmracessComponent;
  let fixture: ComponentFixture<RmracessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmracessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmracessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
