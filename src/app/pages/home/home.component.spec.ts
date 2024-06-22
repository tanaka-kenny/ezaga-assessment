import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService, User } from '../../shared/service/user.service';
import { AuthService } from '../../shared/service/auth.service';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    userService.getUser.and.returnValue(of(mockUser));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve user data on init', () => {
    component.ngOnInit();
    expect(userService.getUser).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
  });

  it('should navigate to profile on viewProfile', () => {
    component.viewProfile();
    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });

});
