import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SUB_URL = 'http://localhost:3000/subscription';
const GET_NOTIF_URL = 'http://localhost:3000/getNotification';

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
