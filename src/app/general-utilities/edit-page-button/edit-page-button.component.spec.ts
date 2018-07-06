import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageButtonComponent } from './edit-page-button.component';

describe('EditPageButtonComponent', () => {
  let component: EditPageButtonComponent;
  let fixture: ComponentFixture<EditPageButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPageButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
