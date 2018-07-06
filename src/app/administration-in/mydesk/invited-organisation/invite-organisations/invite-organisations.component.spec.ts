import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteOrganisationsComponent } from './invite-organisations.component';

describe('InviteOrganisationsComponent', () => {
  let component: InviteOrganisationsComponent;
  let fixture: ComponentFixture<InviteOrganisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteOrganisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
