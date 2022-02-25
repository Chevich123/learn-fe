import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
    }).compileComponents();
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token by getToken', () => {
    const testToken = 'token';
    // @ts-ignore
    service.token = testToken;
    expect(service.getToken()).toEqual(testToken);
  });

  it('should assign token variable', () => {
    const token = 'token';
    service.setToken(token);
    expect(service.getToken()).toEqual(token);
  });
});
