import { TestBed } from '@angular/core/testing';

import { ApiHandlerService } from './apihandler.service';

describe('ApihandlerService', () => {
  let service: ApiHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
