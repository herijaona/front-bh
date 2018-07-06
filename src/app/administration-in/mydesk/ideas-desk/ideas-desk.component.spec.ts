import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasDeskComponent } from './ideas-desk.component';

describe('IdeasDeskComponent', () => {
  let component: IdeasDeskComponent;
  let fixture: ComponentFixture<IdeasDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
