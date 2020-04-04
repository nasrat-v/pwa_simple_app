import { Injectable } from '@angular/core';
import { Router } from "@angular/router"

import { User } from '../types/user.type';

const USER_KEY = 'current-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private router: Router) { }

  public removeUser () {
    localStorage.removeItem(USER_KEY);
  }

  public saveUser(user: User) {
    this.removeUser();
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    var user: User = JSON.parse(localStorage.getItem(USER_KEY));

    if (user == null || user == undefined) {
      this.router.navigate(['/']);
    }
    return user;
  }
}
