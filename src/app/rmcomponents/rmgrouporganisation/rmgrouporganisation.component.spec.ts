import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmgrouporganisationComponent } from './rmgrouporganisation.component';

describe('RmgrouporganisationComponent', () => {
  let component: RmgrouporganisationComponent;
  let fixture: ComponentFixture<RmgrouporganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmgrouporganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmgrouporganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
