import { TestBed, async, inject } from '@angular/core/testing';

import { IsloggedVerifyGuard } from './islogged-verify.guard';

describe('IsloggedVerifyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsloggedVerifyGuard]
    });
  });

  it('should ...', inject([IsloggedVerifyGuard], (guard: IsloggedVerifyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
