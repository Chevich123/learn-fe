import { TestBed as testBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserServiceService', () => {
  let service: UserService;

  beforeEach(() => {
    testBed.configureTestingModule({});
    service = testBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
