import { TestBed } from '@angular/core/testing';

import { OrderPageUsecaseService } from './order-page-usecase.service';

describe('OrderPageUsecaseService', () => {
  let service: OrderPageUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPageUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
