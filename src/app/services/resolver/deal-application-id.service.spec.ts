import { TestBed, inject } from '@angular/core/testing';

import { DealApplicationIdService } from './deal-application-id.service';

describe('DealApplicationIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealApplicationIdService]
    });
  });

  it('should be created', inject([DealApplicationIdService], (service: DealApplicationIdService) => {
    expect(service).toBeTruthy();
  }));
});
