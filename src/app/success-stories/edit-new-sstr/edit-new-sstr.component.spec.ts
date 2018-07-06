import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewSstrComponent } from './edit-new-sstr.component';

describe('EditNewSstrComponent', () => {
  let component: EditNewSstrComponent;
  let fixture: ComponentFixture<EditNewSstrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewSstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewSstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
