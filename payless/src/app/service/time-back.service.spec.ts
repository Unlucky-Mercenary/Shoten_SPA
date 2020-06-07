import { TestBed } from '@angular/core/testing';

import { TimeBackService } from './time-back.service';

describe('TimeBackService', () => {
  let service: TimeBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
