import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedRegisterComponent } from './invited-register.component';

describe('InvitedRegisterComponent', () => {
  let component: InvitedRegisterComponent;
  let fixture: ComponentFixture<InvitedRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
