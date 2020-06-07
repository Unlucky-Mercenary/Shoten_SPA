import { TestBed } from '@angular/core/testing';

import { UnpaidSumService } from './unpaid-sum.service';

describe('UnpaidSumService', () => {
  let service: UnpaidSumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnpaidSumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
