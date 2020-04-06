import { Component } from '@angular/core';

import { UserService } from '../services/user.service';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  public userName: string = '';

  constructor(private userService: UserService
    , private userStorageService: UserStorageService) {}

  public saveChanges() {
    if (this.userName == '') {
      return;
    }
    var user = this.userStorageService.getUser();
    user.user_name = this.userName;
    this.userService.updateUserInfo(user).then(user => {
      this.userStorageService.saveUser(user);
      window.location.reload();
    });
  }
}
