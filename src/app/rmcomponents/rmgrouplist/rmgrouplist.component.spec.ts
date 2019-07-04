import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmgrouplistComponent } from './rmgrouplist.component';

describe('RmgrouplistComponent', () => {
  let component: RmgrouplistComponent;
  let fixture: ComponentFixture<RmgrouplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmgrouplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmgrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
