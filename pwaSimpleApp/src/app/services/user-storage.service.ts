import { Injectable } from '@angular/core';

import { User } from '../types/user.type';

const USER_KEY = 'current-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public removeUser () {
    localStorage.removeItem(USER_KEY);
  }

  public saveUser(user: User) {
    this.removeUser();
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
