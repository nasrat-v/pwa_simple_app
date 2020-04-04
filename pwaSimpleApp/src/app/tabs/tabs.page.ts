import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { SwPush } from '@angular/service-worker';

import { NotificationsPushService } from '../services/notifications-push.service';
import { UserStorageService } from '../services/user-storage.service';
import { UserService } from '../services/user.service';
import { TabNavigationStatus } from '../types/tabs-navigation.type';

const VAPID_PUBLIC = "BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w"

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  public user = null;
  public activeTabName = '';
  public tabsNavigationStatus = new Map<string, TabNavigationStatus>();

  constructor(private userStorageService: UserStorageService
    , private userService: UserService
    , private swPush: SwPush
    , private notificationsPush: NotificationsPushService
    , private router: Router) {
    
      this.initTabsNavigationStatus();
      this.user = this.userStorageService.getUser();
      if (this.user.id != null) {
        this.initNotifications(this.user.id);
      }
  }

  private initTabsNavigationStatus() {
    this.tabsNavigationStatus.set("home", { name: "Home", active: false });
    this.tabsNavigationStatus.set("aperoList", { name: "Apero's list", active: false });
    this.tabsNavigationStatus.set("map", { name: "Map", active: false });
    this.tabsNavigationStatus.set("settings", { name: "Settings", active: false });
  }

  private setTabActive(tabValue: TabNavigationStatus, tabKey: string) {
    tabValue.active = true;
    this.tabsNavigationStatus.forEach((value: TabNavigationStatus, key: string) => {
      if (tabKey != key) {
        value.active = false;
      }
    });
    this.activeTabName = tabValue.name;
  }

  private navigateToTab (key: string, route: string) {
    var tab = this.tabsNavigationStatus.get(key);
    this.setTabActive(tab, key);
    this.router.navigate([route]);
  }

  public navigateToHome() {
    this.navigateToTab('home', '/tabs/home');
  }

  public navigateToAperoList() {
    this.navigateToTab('aperoList', '/tabs/apero-list');
  }

  public navigateToMap() {
    this.navigateToTab('map', '/tabs/map');
  }

  public navigateToSettings() {
    this.navigateToTab('settings', '/tabs/settings');
  }

  public logOut() {
    this.userService.logoutUser();
    this.router.navigate(['/']);
  }

  public initNotifications(userId) {

    if (this.swPush.isEnabled) {
    console.log("wtf ok swpush");
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
    })
    .then(sub => {
      this.notificationsPush.sendSubscriptionToTheServer(sub, userId).then(res => {
        console.log("Subscription done.");
      }, error => {console.log(error.error)});
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
    } else {
      console.log("SwPush not enabled on this computer.")
    }
  }

}
