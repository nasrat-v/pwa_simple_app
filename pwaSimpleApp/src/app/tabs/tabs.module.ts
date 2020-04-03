//import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

import { NotificationsPushService } from '../services/notifications-push.service'

@NgModule({
  imports: [
    //IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  providers : [NotificationsPushService],
  declarations: [TabsPage]
})
export class TabsPageModule {}
