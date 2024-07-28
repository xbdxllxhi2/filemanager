import { TestBed } from '@angular/core/testing';

import { AuthzServiceService } from './authz-service.service';

describe('AuthzServiceService', () => {
  let service: AuthzServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthzServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
