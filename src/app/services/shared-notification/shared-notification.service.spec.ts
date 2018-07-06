import { TestBed, inject } from '@angular/core/testing';

import { SharedNotificationService } from './shared-notification.service';

describe('SharedNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedNotificationService]
    });
  });

  it('should be created', inject([SharedNotificationService], (service: SharedNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
