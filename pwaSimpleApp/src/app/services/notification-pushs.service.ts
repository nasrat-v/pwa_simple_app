import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


/* {"publicKey":"BBpIBZLDwUAAiipbW0v4ecSdAdXwYa0crHkub0yAV8KJeMqydsAf8jP_ApsBMa1xT5h8N15A147_esszZOUrNt4","privateKey":"BOaRorKIO-N72X2UC8ONMRrhAQreuakuBt65aoNDFeg"} */


const SERVER_URL = 'http://localhost:3000/subscription'

@Injectable({
  providedIn: 'root'
})
export class NotificationPushsService {

  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription)
  }
}
