import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedOrganisationComponent } from './invited-organisation.component';

describe('InvitedOrganisationComponent', () => {
  let component: InvitedOrganisationComponent;
  let fixture: ComponentFixture<InvitedOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
