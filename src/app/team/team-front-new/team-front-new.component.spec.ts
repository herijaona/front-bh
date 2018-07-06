import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFrontNewComponent } from './team-front-new.component';

describe('TeamFrontNewComponent', () => {
  let component: TeamFrontNewComponent;
  let fixture: ComponentFixture<TeamFrontNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFrontNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFrontNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
