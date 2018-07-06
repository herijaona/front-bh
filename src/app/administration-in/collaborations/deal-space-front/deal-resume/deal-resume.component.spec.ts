import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealResumeComponent } from './deal-resume.component';

describe('DealResumeComponent', () => {
  let component: DealResumeComponent;
  let fixture: ComponentFixture<DealResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
