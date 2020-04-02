import { Component, NgModule } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
import { UserService } from '../services/user.service';
import { SwPush } from '@angular/service-worker';


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
    private userService: UserService,
    private swPush : SwPush
    /*public authFirebaseService: AuthFirebaseService*/
    ) {
    //this.profileService = navParams.get('ProfileService');
    //console.log('email  ' + this.profileService.getEmail);
    //console.log('id : ' + authFirebaseService.getUSer().uid);

    //console.log("user !!" + authFirebaseService.getFirebaseAuth().auth.currentUser.uid);
    //firebase.auth().currentUser

  
  }

}
