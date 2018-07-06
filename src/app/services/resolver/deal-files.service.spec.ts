import { TestBed, inject } from '@angular/core/testing';

import { DealFilesService } from './deal-files.service';

describe('DealFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealFilesService]
    });
  });

  it('should be created', inject([DealFilesService], (service: DealFilesService) => {
    expect(service).toBeTruthy();
  }));
});
