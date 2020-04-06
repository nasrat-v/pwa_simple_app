import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const SUB_URL = (environment.apiURL + "/subscription");
const GET_NOTIF_URL = (environment.apiURL + "/getNotification");

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  public sendSubscriptionToServer(sub: PushSubscription) {
    this.http.post(SUB_URL, sub)
    .subscribe(
      res => console.log(res), 
      err => console.error(err)
    );
  }

  public getNotification() {
    this.http.get(GET_NOTIF_URL)
    .subscribe(
      res => console.log(res), 
      err => console.error(err)
    );
  }
}
