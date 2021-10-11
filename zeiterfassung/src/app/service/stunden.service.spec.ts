import { TestBed } from '@angular/core/testing';

import { StundenServiceService } from './stunden.service';

describe('StundenServiceService', () => {
  let service: StundenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StundenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
