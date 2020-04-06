import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';

class NotifMessage {
  message : string
}

class CustomSubscription {
  userId : Int32Array
  subscription : PushSubscription
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsPushService {

  constructor(private http: HttpClient) {}

  
  public sendSubscriptionToTheServer(subscription: PushSubscription, userId: Int32Array) {
    console.log("new subscription");
    
    var data : CustomSubscription = {
      userId : userId,
      subscription : subscription
    }
    return new Promise((resolve, reject) =>{
      this.http.post<CustomSubscription>(environment.apiURL + "/subscription", data).toPromise().then(
        apero => {
          resolve("ok test de ouf");
        },
        err => {
          reject(err.error);
        }
      )
    });
  }

  public sendNotifApero(message : string) {
    console.log("New notification", message);
    var newMsg : NotifMessage = {
      message : message
    }
    console.log("newMsg =", newMsg);
    return new Promise((resolve, reject) =>{
      this.http.post<NotifMessage>(environment.apiURL + "/sendNotification", newMsg).toPromise().then(
        apero => {
          resolve("Notif sent");
        },
        err => {
          reject(err.error);
        }
      )
    });
  }
}
