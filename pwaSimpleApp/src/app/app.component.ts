import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

//import { AuthFirebaseService } from './services/auth-firebase.service'
import { Router } from '@angular/router';
import { FcmService } from './services/fcm.service';
import { UserService } from './services/user.service';
import { SwPush } from '@angular/service-worker';
import { NotificationsPushService } from './services/notifications-push.service'

/*
{"publicKey":"BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w"
,"privateKey":"o966EZaIx7JVkHWO0BjcB0JMWz4qnxS3WIAla1ELraQ"}
*/

const VAPID_PUBLIC = "BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  email: string
  password: string

  constructor(
    //private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    //public authFirebaseService: AuthFirebaseService,
    private fcm: FcmService,
    private http: HttpClient,
    private userService: UserService,
    private swPush: SwPush,
    private notificationsPush : NotificationsPushService
  ) {
    this.initializeApp();
    this.initNotifications();
  }

   initNotifications() {

    if (this.swPush.isEnabled) {
    console.log("wtf ok swpush");
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
    })
    .then(sub => {  
      this.notificationsPush.sendSubscriptionToTheServer(sub).then(res => {
        console.log("Subscription done.");
        
        this.notificationsPush.sendNotifApero("Test message")
        .then(res => console.log("ok"), error => {console.log(error.error)});

      }, error => {console.log(error.error)});

      /*
      this.notificationsPush.sendSubscriptionToTheServer(sub).then(
        ret => {
          console.log("OK");
        }
      );*/
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
    } else {
      console.log("SwPush not enabled on this computer.")
    }
  }

  initializeApp() {
    //this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      //this.fcm.showMessages().subscribe();
    //});
  }
}
