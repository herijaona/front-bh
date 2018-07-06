import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllColabComponent } from './admin-all-colab.component';

describe('AdminAllColabComponent', () => {
  let component: AdminAllColabComponent;
  let fixture: ComponentFixture<AdminAllColabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllColabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllColabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
