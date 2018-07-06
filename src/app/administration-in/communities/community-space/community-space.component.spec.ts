import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySpaceComponent } from './community-space.component';

describe('CommunitySpaceComponent', () => {
  let component: CommunitySpaceComponent;
  let fixture: ComponentFixture<CommunitySpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitySpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
