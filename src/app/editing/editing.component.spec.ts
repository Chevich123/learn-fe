import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingComponent } from './editing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { of } from 'rxjs';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AppService } from '../service/app.service';


describe('EditingComponent', () => {
  let component: EditingComponent;
  let fixture: ComponentFixture<EditingComponent>;
  let router: Router;

  const mockUsersService = {
    edit: jasmine.createSpy(),
  }

  const mockAppService = {
    navigate: jasmine.createSpy(),
  }

  const mockTokenService = {
    getToken: jasmine.createSpy(),
  }

  beforeEach(async () => {
    // @ts-ignore
    await TestBed.configureTestingModule({
      imports: [
        [MatDialogModule],
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AppService, useValue: mockAppService },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              })
            }
          }
        }
      ],
      declarations: [ EditingComponent ]
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
    component.ngOnInit();
    expect(component.id).toBe('1');
  })

  it('should redirect user to `/users` route', () => {
    component.redirect()
    expect(mockAppService.navigate).toHaveBeenCalledWith(['/users'], undefined);
  })

  it('should edit user profile', () => {
    const user: IUser = new IUser('', '')
    const users = [user]
    const userId = ''
    const token = ''
    mockUsersService.edit.and.returnValue(of(users))
    component.edit();
    expect(mockUsersService.edit).toHaveBeenCalledWith(token, user, userId);
  })
});

