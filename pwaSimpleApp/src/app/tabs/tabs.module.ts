//import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

import { NotificationPushsService } from '../services/notification-pushs.service'
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    //IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule
  ],
  providers : [NotificationPushsService],
  declarations: [TabsPage]
})
export class TabsPageModule {}
