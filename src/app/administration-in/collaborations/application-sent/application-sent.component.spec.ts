import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSentComponent } from './application-sent.component';

describe('ApplicationSentComponent', () => {
  let component: ApplicationSentComponent;
  let fixture: ComponentFixture<ApplicationSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
