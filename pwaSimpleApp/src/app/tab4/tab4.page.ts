import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private userService: UserService, private router: Router) {
    this.logOut();
  }

  public logOut() {
    this.userService.logoutUser();
    this.router.navigate(['/']);
  }
}
