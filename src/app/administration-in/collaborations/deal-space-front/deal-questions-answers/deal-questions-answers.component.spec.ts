import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealQuestionsAnswersComponent } from './deal-questions-answers.component';

describe('DealQuestionsAnswersComponent', () => {
  let component: DealQuestionsAnswersComponent;
  let fixture: ComponentFixture<DealQuestionsAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealQuestionsAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealQuestionsAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
