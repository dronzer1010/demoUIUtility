import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmtemplatesComponent } from './rmtemplates.component';

describe('RmtemplatesComponent', () => {
  let component: RmtemplatesComponent;
  let fixture: ComponentFixture<RmtemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmtemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmtemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
