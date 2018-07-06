import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCollabApplicationComponent } from './one-collab-application.component';

describe('OneCollabApplicationComponent', () => {
  let component: OneCollabApplicationComponent;
  let fixture: ComponentFixture<OneCollabApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCollabApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCollabApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
