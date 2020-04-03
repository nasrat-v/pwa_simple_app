import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserCredentials } from '../types/user.type';
import { ResultServerResponse, UserQueryServerResponse, UserNameQueryServerResponse } from '../types/server-response.type';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { 
    this.resetUser();
  }

  private resetUser() {
    this.user = null;
  }
  
  public getUser() {
    return this.user;
  }

  public getUserNameById(user_id: string) {
    return new Promise<string>((resolve, reject) => {
      this.http.get<UserNameQueryServerResponse>("http://127.0.0.1:3000/getUserNameById?user_id=" + user_id).toPromise()
      .then(res => {
        console.log(res.msg);
        resolve(res.user_name);
      }, (err) => {
        console.error(err.error.msg);
        reject(err.error);
      });
    })
  }

  public createUser(userCreds: UserCredentials) {
    return new Promise<ResultServerResponse>((resolve, reject) => {
      this.http.post<ResultServerResponse>("http://127.0.0.1:3000/addUser", userCreds)
      .toPromise()
      .then(res => {
        console.log(res.msg);
        resolve(res);
      },
      (err) => {
        console.error(err.error.msg);
        reject(err.error);
      });
    });
  }

  public loginUser(userCreds: UserCredentials) {
    return new Promise<UserQueryServerResponse>((resolve, reject) => {
      this.http.post<UserQueryServerResponse>("http://127.0.0.1:3000/logIn", userCreds)
      .toPromise()
      .then(res => {
        this.user = res.user;
        this.tokenStorageService.saveToken(res.user_auth);
        console.log(res.msg);
        resolve(res);
      },
      (err) => {
        console.error(err.error.msg);
        reject(err.error);
      });
    });
  }

  public logoutUser() {
    this.resetUser();
    this.tokenStorageService.removeToken();
  }

}
