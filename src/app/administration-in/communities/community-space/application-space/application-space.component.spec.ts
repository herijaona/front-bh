import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSpaceComponent } from './application-space.component';

describe('ApplicationSpaceComponent', () => {
  let component: ApplicationSpaceComponent;
  let fixture: ComponentFixture<ApplicationSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
