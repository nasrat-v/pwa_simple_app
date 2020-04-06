import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserCredentials } from '../types/user.type';
import { ResultServerResponse, UserAuthServerResponse, UserInfoServerResponse,  UserNameQueryServerResponse } from '../types/server-response.type';
import { TokenStorageService } from '../services/token-storage.service';
import { UserStorageService } from '../services/user-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient
    , private tokenStorageService: TokenStorageService
    , private userStorageService: UserStorageService) { 
  }


  public updateUserInfo(user: User) {
    return new Promise<User>((resolve, reject) => {
      this.http.post<UserInfoServerResponse>(environment.apiURL + "/updateUserInfo", user)
      .toPromise()
      .then(res => {
        console.log(res.msg);
        resolve(res.user);
      },
      (err) => {
        console.error(err.error.msg);
        reject(err.error);
      });
    });
  }

  public getNbUsers() {
    return new Promise<string>((resolve, reject) => {
      this.http.get<ResultServerResponse>(environment.apiURL + "/getNbUsers").toPromise()
      .then(res => {
        console.log(res.msg);
        resolve(res.msg);
      }, (err) => {
        console.error(err.error.msg);
        reject(err.error);
      });
    })
  }

  public getUserNameById(user_id: string) {
    return new Promise<string>((resolve, reject) => {
      this.http.get<UserNameQueryServerResponse>(environment.apiURL + "/getUserNameById?user_id=" + user_id).toPromise()
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
      this.http.post<ResultServerResponse>(environment.apiURL + "/addUser", userCreds)
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
    return new Promise<UserAuthServerResponse>((resolve, reject) => {
      this.http.post<UserAuthServerResponse>(environment.apiURL + "/logIn", userCreds)
      .toPromise()
      .then(res => {
        this.userStorageService.saveUser(res.user);
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
    this.userStorageService.removeUser();
    this.tokenStorageService.removeToken();
  }

}
