import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReactionComponent } from './view-reaction.component';

describe('ViewReactionComponent', () => {
  let component: ViewReactionComponent;
  let fixture: ComponentFixture<ViewReactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
