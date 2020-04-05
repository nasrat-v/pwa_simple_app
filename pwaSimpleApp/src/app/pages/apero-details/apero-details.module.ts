import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AperoDetailsPage } from './apero-details.page';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: AperoDetailsPage }]),
    GooglePlaceModule
  ],
  declarations: [AperoDetailsPage]
})
export class AperoDetailsPageModule {}
