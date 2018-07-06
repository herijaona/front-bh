import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditAndNewComponent } from './project-edit-and-new.component';

describe('ProjectEditAndNewComponent', () => {
  let component: ProjectEditAndNewComponent;
  let fixture: ComponentFixture<ProjectEditAndNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditAndNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditAndNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
