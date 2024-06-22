import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthRequest, AuthResponse, RegisterRequest } from '../model/auth.model';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  const mockAuthRequest: AuthRequest = { email: 'test@example.com', password: 'password123' };
  const mockAuthResponse: AuthResponse = { accessToken: 'mockAccessToken', refreshToken: '' };
  const mockRegisterRequest: RegisterRequest = { email: 'test@example.com', password: 'password123', role: 'USER', firstname: 'Jon', lastname: 'Snows' };

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock local storage utility functions
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'email' ? 'test@example.com' : null;
    });
    spyOn(localStorage, 'removeItem').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return AuthResponse', () => {
    service.login(mockAuthRequest).subscribe((response: AuthResponse) => {
      expect(response).toEqual(mockAuthResponse);
    });

    const req = httpMock.expectOne(`${service['AUTH_ROOT']}login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);
  });

  it('should register a user and return AuthResponse', () => {
    service.register(mockRegisterRequest).subscribe((response: AuthResponse) => {
      expect(response).toEqual(mockAuthResponse);
    });

    const req = httpMock.expectOne(`${service['AUTH_ROOT']}register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.role).toBe('USER');
    req.flush(mockAuthResponse);
  });

  it('should logout and navigate to login', () => {
    service.lougout();

    const req = httpMock.expectOne(`${service['AUTH_ROOT']}logout/test@example.com`);
    expect(req.request.method).toBe('POST');
    req.flush(null);

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('email');
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
