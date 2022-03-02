import {TestBed} from '@angular/core/testing';

import {TokenService} from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  const mockLocalStorage = {
    getItem: jasmine.createSpy()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: localStorage, useValue: mockLocalStorage },
      ]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should assign token variable', () => {
    const token = 'token';
    service.setToken(token);
    expect(service.getToken()).toEqual(token);
  });

  it('is authorized user', () => {
    const token = 'token';
    service.setToken(token);
    expect(service.isAuthenticated()).toBeTruthy()
  });
});
