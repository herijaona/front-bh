import { TestBed, inject } from '@angular/core/testing';

import { DealResolverIdService } from './deal-resolver-id.service';

describe('DealResolverIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealResolverIdService]
    });
  });

  it('should be created', inject([DealResolverIdService], (service: DealResolverIdService) => {
    expect(service).toBeTruthy();
  }));
});
