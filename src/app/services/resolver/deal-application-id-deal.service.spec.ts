import { TestBed, inject } from '@angular/core/testing';

import { DealApplicationIdDealService } from './deal-application-id-deal.service';

describe('DealApplicationIdDealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealApplicationIdDealService]
    });
  });

  it('should be created', inject([DealApplicationIdDealService], (service: DealApplicationIdDealService) => {
    expect(service).toBeTruthy();
  }));
});
