import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(readonly swPush: SwPush, public notifService: NotificationService) {
  }

  ngOnInit() {
    this.subscribeToPush();
  }

  title = 'pwaSimpleApp';

  private async subscribeToPush() {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapidKeys.publicKey
      })
      .then(sub => {
        console.log(sub);
        this.notifService.sendSubscriptionToServer(sub);
      })
      .catch(err => console.error('cannot subscribe: ' + err));
    } else {
      console.log('disabled');
    }
  }

  public async getNotification() {
    console.log('get notification');
    this.notifService.getNotification();
  }
}
