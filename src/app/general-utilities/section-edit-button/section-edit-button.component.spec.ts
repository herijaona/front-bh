import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEditButtonComponent } from './section-edit-button.component';

describe('SectionEditButtonComponent', () => {
  let component: SectionEditButtonComponent;
  let fixture: ComponentFixture<SectionEditButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionEditButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
