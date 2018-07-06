import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedInvitationsComponent } from './accepted-invitations.component';

describe('AcceptedInvitationsComponent', () => {
  let component: AcceptedInvitationsComponent;
  let fixture: ComponentFixture<AcceptedInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
