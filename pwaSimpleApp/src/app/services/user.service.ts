import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number,
  email: string,
  password: string,
  lat: number,
  lon: number,
  aperos_id: number,
  error: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return this.user;
  }

  createUser(newUser: User){
    return new Promise((resolve, reject) =>{
      this.http.post<User>("http://127.0.0.1:3000/addUser", newUser).toPromise().then(
        user => {
          if (user.email != undefined) {
            this.user = user;
            resolve("OK");
          } else {
            resolve(user.error);
          }
        },
        err => {
          reject(err.error);
        }
      )
    });
  }

  loginUser(userLogin: User) {
    return new Promise((resolve, reject) =>{
      this.http.get<User>("http://127.0.0.1:3000/getUser?email=" + userLogin.email + "&password=" + userLogin.password + "&lat=" + userLogin.lat + "&lon=" +userLogin.lon).toPromise().then(
        user => {
          if (user.error == undefined) {
            //console.log(user)
            //console.log("on est log");
            this.user = user;
            resolve("OK");
          } else {
            resolve(user.error);
          }
        },
        err => {
          reject(err.error);
          //console.error("ERROR: " + err.error);
        });
    });
  }

}
