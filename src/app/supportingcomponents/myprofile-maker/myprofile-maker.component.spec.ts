import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileMakerComponent } from './myprofile-maker.component';

describe('MyprofileMakerComponent', () => {
  let component: MyprofileMakerComponent;
  let fixture: ComponentFixture<MyprofileMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
