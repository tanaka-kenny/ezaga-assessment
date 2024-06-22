import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { setAccessToken, setEmail } from '../utils/utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMsg));
    })
  );
};
