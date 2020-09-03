import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmdirpaybillersComponent } from './rmdirpaybillers.component';

describe('RmdirpaybillersComponent', () => {
  let component: RmdirpaybillersComponent;
  let fixture: ComponentFixture<RmdirpaybillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmdirpaybillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmdirpaybillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
