import { Component, NgModule } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
//import { AuthFirebaseService } from '../services/auth-firebase.service';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';
import { SwPush } from '@angular/service-worker';

/* {"publicKey":"BBpIBZLDwUAAiipbW0v4ecSdAdXwYa0crHkub0yAV8KJeMqydsAf8jP_ApsBMa1xT5h8N15A147_esszZOUrNt4","privateKey":"BOaRorKIO-N72X2UC8ONMRrhAQreuakuBt65aoNDFeg"} */

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  private VAPID_PUBLIC = "BBpIBZLDwUAAiipbW0v4ecSdAdXwYa0crHkub0yAV8KJeMqydsAf8jP_ApsBMa1xT5h8N15A147_esszZOUrNt4";

  private route: ActivatedRoute
  private router: Router
  private profileService: ProfileService;

  constructor(swPush : SwPush,
    private userService: UserService    
    /*public authFirebaseService: AuthFirebaseService*/
    ) {
    //this.profileService = navParams.get('ProfileService');
    //console.log('email  ' + this.profileService.getEmail);
    //console.log('id : ' + authFirebaseService.getUSer().uid);

    //console.log("user !!" + authFirebaseService.getFirebaseAuth().auth.currentUser.uid);
    //firebase.auth().currentUser

    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC,
        })
        .then(subscription => {
          // send subscription to the server
        })
        .catch(console.error)
    }
  }

}
