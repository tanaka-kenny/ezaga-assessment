import { HttpInterceptorFn } from "@angular/common/http";

export const userInterceptor: HttpInterceptorFn = (req, next) => {
    if (!req.url.includes('auth')) {
        let authToken = localStorage.getItem('access_token') as string;
        if (authToken) {
            const authRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log('outging');
            
            return next(authRequest)
        }
    }
    return next(req);
}
