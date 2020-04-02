//import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

import { NotificationPushsService } from '../services/notification-pushs.service'

@NgModule({
  imports: [
    //IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  providers : [NotificationPushsService],
  declarations: [TabsPage]
})
export class TabsPageModule {}
