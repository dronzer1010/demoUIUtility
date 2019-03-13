import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserunitaryComponent } from './userunitary.component';

describe('UserunitaryComponent', () => {
  let component: UserunitaryComponent;
  let fixture: ComponentFixture<UserunitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserunitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserunitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
