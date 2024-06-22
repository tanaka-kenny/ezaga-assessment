import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'email' ? mockUser.email : null;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    service.getUser().subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiRootUrl}/user/${mockUser.email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update user data', () => {
    const updatedUser: User = {
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane.doe@example.com'
    };

    service.updateUser(updatedUser).subscribe((user: User) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${environment.apiRootUrl}/user/${mockUser.email}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });
});
