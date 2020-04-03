import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private userService: UserService, private router: Router) {}

  public logOut() {
    this.userService.logoutUser();
    this.router.navigate(['/']);
  }
}
