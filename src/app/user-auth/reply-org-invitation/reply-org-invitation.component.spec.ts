import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyOrgInvitationComponent } from './reply-org-invitation.component';

describe('ReplyOrgInvitationComponent', () => {
  let component: ReplyOrgInvitationComponent;
  let fixture: ComponentFixture<ReplyOrgInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyOrgInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyOrgInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
