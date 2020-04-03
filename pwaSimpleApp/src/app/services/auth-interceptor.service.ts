import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes("https://maps.googleapis.com")) {
      const token: string = this.tokenStorageService.getToken();

      if (token) {
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
        req = req.clone({ headers: req.headers.set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE') });
        req = req.clone({ headers: req.headers.set('Access-Control-Allow-Headers', 'Authorization, Lang') });
      }
    }
    return next.handle(req);
  }
}