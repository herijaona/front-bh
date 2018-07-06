import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderCommunitiesComponent } from './under-communities.component';

describe('UnderCommunitiesComponent', () => {
  let component: UnderCommunitiesComponent;
  let fixture: ComponentFixture<UnderCommunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
