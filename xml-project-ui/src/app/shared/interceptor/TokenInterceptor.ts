import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUserService } from '../services/logged-user-service/logged-user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: LoggedUserService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      Accept: 'application/xml',
      'Content-Type': 'application/xml',
    });
    if (this.auth.isTokenPresent) {
      headers.append('Authorization', `Bearer ${this.auth.token}`);
    }
    request = request.clone({ headers });
    return next.handle(request);
  }
}
