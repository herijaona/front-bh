import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCompletionComponent } from './p-completion.component';

describe('PCompletionComponent', () => {
  let component: PCompletionComponent;
  let fixture: ComponentFixture<PCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
