import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginScreenModule } from './login-screen/login-screen.module'
import { RegisterScreenModule } from './register-screen/register-screen.module'
import { TabsPageModule } from './tabs/tabs.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule, 
    HttpClientModule,
    GooglePlaceModule,
    TabsPageModule,
    LoginScreenModule,
    RegisterScreenModule,
    BrowserModule.withServerTransition({
      appId: 'ng-universal-demystified'
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    AgmCoreModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}