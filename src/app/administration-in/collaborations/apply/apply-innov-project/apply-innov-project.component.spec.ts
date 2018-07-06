import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyInnovProjectComponent } from './apply-innov-project.component';

describe('ApplyInnovProjectComponent', () => {
  let component: ApplyInnovProjectComponent;
  let fixture: ComponentFixture<ApplyInnovProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyInnovProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyInnovProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
