import { Injectable } from '@angular/core';

import { UserAuthentication } from '../types/user.type';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public removeToken () {
    localStorage.removeItem(TOKEN_KEY);
  }

  public saveToken(userAuth: UserAuthentication) {
    this.removeToken();
    localStorage.setItem(TOKEN_KEY, userAuth.token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}
