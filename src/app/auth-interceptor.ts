import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (['/api/auth/login/'].includes(req.url)) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    const modifyedReq = req.clone({
      headers: req.headers.append("Authorization", `Basic ${token}`)
    })
    return next.handle(modifyedReq);
  }
}