import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationByCollaborationComponent } from './application-by-collaboration.component';

describe('ApplicationByCollaborationComponent', () => {
  let component: ApplicationByCollaborationComponent;
  let fixture: ComponentFixture<ApplicationByCollaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationByCollaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationByCollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
