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
  }

  initializeApp() {
    //this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      //this.fcm.showMessages().subscribe();
    //});
  }
}
