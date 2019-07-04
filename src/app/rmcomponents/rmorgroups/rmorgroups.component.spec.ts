import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmorgroupsComponent } from './rmorgroups.component';

describe('RmorgroupsComponent', () => {
  let component: RmorgroupsComponent;
  let fixture: ComponentFixture<RmorgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmorgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmorgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
