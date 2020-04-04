import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: HomePage }]),
    AgmCoreModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}