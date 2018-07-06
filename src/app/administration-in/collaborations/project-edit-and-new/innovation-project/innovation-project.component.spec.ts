import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationProjectComponent } from './innovation-project.component';

describe('InnovationProjectComponent', () => {
  let component: InnovationProjectComponent;
  let fixture: ComponentFixture<InnovationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
