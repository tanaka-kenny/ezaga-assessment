import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { setAccessToken, setEmail } from '../utils/local-storage.utils';
import { inject } from '@angular/core';
import { ToasterService } from '../service/toaster.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const toasterService = inject(ToasterService);
  
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body?.access_token) {
            setAccessToken(event.body.access_token);
        }
        if (event.body?.email) {
          setEmail(event.body.email)
      }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error intercepted:', error);
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          switch(error.status) {
            case 400:
              toasterService.showError(error.error, '');
              break;
            case 401:
              toasterService.showError('Please enter the correct email and password details', error.error);
              break;
          }
        }
        return throwError(() => new Error(errorMsg));
    })
  );
};
