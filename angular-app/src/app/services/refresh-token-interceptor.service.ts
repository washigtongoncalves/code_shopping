import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponseBase
 } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const success = (event: HttpEvent<any>) => {
      this.setNewTokenIfResponseValid(event);
    };
    const error = (eventError: HttpEvent<any>) => {
      this.setNewTokenIfResponseValid(eventError);
      this.redirectToLoginIfUnauthenticated(eventError);
    };
    return next
      .handle(req)
      .pipe(tap(success, error));
  }

  private redirectToLoginIfUnauthenticated(eventError: HttpEvent<any>) {
    if (eventError instanceof HttpErrorResponse && eventError.status === 401) {
      this.authService.setToken(null);
      this.router.navigate(['/login']);
    }
  }

  private setNewTokenIfResponseValid(event: HttpEvent<any>) {
    if (event instanceof HttpResponseBase) {
      const authorizationHeader = event.headers.get('authorization');
      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        this.authService.setToken(token);
      }
    }
  }
}
