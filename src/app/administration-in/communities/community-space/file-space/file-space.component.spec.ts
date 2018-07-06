import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSpaceComponent } from './file-space.component';

describe('FileSpaceComponent', () => {
  let component: FileSpaceComponent;
  let fixture: ComponentFixture<FileSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
