import { Component, NgModule } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
import { SwPush } from '@angular/service-worker';

import { NotificationsPushService } from '../services/notifications-push.service';
import { UserStorageService } from '../services/user-storage.service';


/*
{"publicKey":"BJaQW03qxObc8FrcQgJsAmn_IC-akz6GLam8CQ8XHoT78LlK40lFMjSNK6dM9HQU1Ew8q4e19fmYr3gXWqWzoPA",
"privateKey":"-xu3Yc3gSidvhfT8b44r7K9u3HYWe2-fqm8nxa5gOV0"}
*/

const VAPID_PUBLIC = "BJaQW03qxObc8FrcQgJsAmn_IC-akz6GLam8CQ8XHoT78LlK40lFMjSNK6dM9HQU1Ew8q4e19fmYr3gXWqWzoPA"


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  private route: ActivatedRoute
  private router: Router
  //private profileService: ProfileService;

  constructor(
    private userStorageService: UserStorageService,
    private swPush : SwPush,
    private notificationsPush : NotificationsPushService,
    /*public authFirebaseService: AuthFirebaseService*/
    ) {
    //this.profileService = navParams.get('ProfileService');
    //console.log('email  ' + this.profileService.getEmail);
    //console.log('id : ' + authFirebaseService.getUSer().uid);

    //console.log("user !!" + authFirebaseService.getFirebaseAuth().auth.currentUser.uid);
    //firebase.auth().currentUser


      this.initNotifications(this.userStorageService.getUser().id);
  }

  initNotifications(userId) {

    if (this.swPush.isEnabled) {
    console.log("wtf ok swpush");
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
    })
    .then(sub => {  
      this.notificationsPush.sendSubscriptionToTheServer(sub, userId).then(res => {
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

}
