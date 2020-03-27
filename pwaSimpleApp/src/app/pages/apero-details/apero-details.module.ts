import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { IonicModule } from '@ionic/angular';

import { AperoDetailsPageRoutingModule } from './apero-details-routing.module';

import { AperoDetailsPage } from './apero-details.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //IonicModule,
    //AperoDetailsPageRoutingModule,
    RouterModule.forChild([{ path: "", component: AperoDetailsPage }]),
  ],
  declarations: [AperoDetailsPage]
})
export class AperoDetailsPageModule {}
