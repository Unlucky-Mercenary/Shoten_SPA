import { TestBed } from '@angular/core/testing';

import { GetDatesService } from './get-dates.service';

describe('GetDatesService', () => {
  let service: GetDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
