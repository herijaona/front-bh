import { TestBed, inject } from '@angular/core/testing';

import { DealSpaceService } from './deal-space.service';

describe('DealSpaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealSpaceService]
    });
  });

  it('should be created', inject([DealSpaceService], (service: DealSpaceService) => {
    expect(service).toBeTruthy();
  }));
});
