import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './service/users.service';
import { AppService } from './service/app.service';
import { TokenService } from './service/token.service';
import { MatMenuModule } from '@angular/material/menu';

describe('AppComponent', () => {
  const mockUsersService = {};
  const mockAppService = {};
  const mockTokenService = {
    getToken: jasmine.createSpy(),
  };
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: UsersService, useValue: mockUsersService },
        { provide: AppService, useValue: mockAppService },
        { provide: TokenService, useValue: mockTokenService },
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled?.textContent).toContain('Main');
  });
});
