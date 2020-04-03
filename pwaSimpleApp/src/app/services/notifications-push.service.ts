import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


/* {"publicKey":"BBpIBZLDwUAAiipbW0v4ecSdAdXwYa0crHkub0yAV8KJeMqydsAf8jP_ApsBMa1xT5h8N15A147_esszZOUrNt4","privateKey":"BOaRorKIO-N72X2UC8ONMRrhAQreuakuBt65aoNDFeg"} */


const SERVER_URL = 'http://localhost:3400/subscription'

@Injectable({
  providedIn: 'root'
})
export class NotificationsPushService {

  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log("New subscription sent");
    this.http.post(SERVER_URL, subscription)
    .subscribe(
      res => console.log(res), 
      err => console.error(err)
    );
    //return this.http.post(SERVER_URL, subscription)
  }
}
