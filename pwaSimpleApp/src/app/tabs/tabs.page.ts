import { Component, NgModule } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
//import { AuthFirebaseService } from '../services/auth-firebase.service';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  private route: ActivatedRoute
  private router: Router
  private profileService: ProfileService;

  constructor(
    private userService: UserService    
    /*public authFirebaseService: AuthFirebaseService*/
    ) {
    //this.profileService = navParams.get('ProfileService');
    //console.log('email  ' + this.profileService.getEmail);
    //console.log('id : ' + authFirebaseService.getUSer().uid);

    //console.log("user !!" + authFirebaseService.getFirebaseAuth().auth.currentUser.uid);
    //firebase.auth().currentUser
  }

}
