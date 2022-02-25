import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingComponent } from './editing.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from '../service/token.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { of } from 'rxjs';
import { AppService } from '../service/app.service';

describe('EditingComponent', () => {
  let component: EditingComponent;
  let fixture: ComponentFixture<EditingComponent>;

  const mockMatDialog = {
    open: jasmine.createSpy(),
  };

  const mockUsersService = {
    edit: jasmine.createSpy(),
  };

  const mockAppService = {
    navigate: jasmine.createSpy(),
  };

  const mockTokenService = {};

  beforeEach(async () => {
    // @ts-ignore
    await TestBed.configureTestingModule({
      declarations: [EditingComponent],
      imports: [ BrowserAnimationsModule, HttpClientModule, RouterTestingModule, MatDialogModule ],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AppService, useValue: mockAppService },
        { provide: TokenService, useValue: mockTokenService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
            },
          },
        },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should assign id correctly', () => {
    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.testParamMap = { id: '1' };
    component.id = activatedRoute.testParamMap.id;
    expect(component.id).toBe('1');
  });

  describe('should subscribe to dialog', () => {
    it('should get data from dialog', () => {
      const componentInstance = {
        name: 'test',
        email: 'test@mail.com',
        phone: 'test',
        site: 'www.test.com',
      };

      const mockDialogRef = {
        afterClosed: jasmine.createSpy(),
        componentInstance,
      };

      mockMatDialog.open.and.returnValue(mockDialogRef);
      mockDialogRef.afterClosed.and.returnValue(of(true));

      component.ngOnInit();

      expect(component.data).toBeTruthy();
      expect(component.user.username).toEqual('test');
      expect(component.user.email).toEqual('test@mail.com');
      expect(component.user.phone).toEqual('test');
      expect(component.user.site).toEqual('www.test.com');
    });

    it('should get false data from dialog', () => {
      const componentInstance = { };

      const mockDialogRef = {
        afterClosed: jasmine.createSpy(),
        componentInstance,
      };

      mockMatDialog.open.and.returnValue(mockDialogRef);
      mockDialogRef.afterClosed.and.returnValue(of(false));

      component.ngOnInit();
      expect(component.data).toBeFalsy();
    });
  });

  it('should redirect user to `/users` route', () => {
    component.redirect();
    expect(mockAppService.navigate).toHaveBeenCalledWith(['/users'], undefined);
  });

  it('should edit user profile', () => {
    const user: IUser = new IUser('', '');
    const users = [user];
    const userId = '';
    const token = '';
    mockUsersService.edit.and.returnValue(of(users));
    component.edit();
    expect(mockUsersService.edit).toHaveBeenCalledWith(token, user, userId);
  });
});

