import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  RouterModule, Routes, PreloadAllModules } from '@angular/router';
//import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//import { AngularFireModule } from '@angular/fire';
//import { AngularFireMessagingModule } from '@angular/fire/messaging';
//import { AngularFireFunctionsModule } from '@angular/fire/functions';
//import { environment } from '../environments/environment';
//import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
//import { AngularFireAuthModule } from '@angular/fire/auth';
//import { AuthFirebaseService } from './services/auth-firebase.service'

import { LoginScreenModule } from './login-screen/login-screen.module'
import { TabsPageModule } from './tabs/tabs.module';
/*
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login-screen/login-screen.module').then(m => m.LoginScreenModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  }
];
*/
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    /*RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules }
    ),*/
    BrowserModule, 
    //IonicModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
    //AngularFireAuthModule,
    //AngularFireMessagingModule,
    //AngularFireFunctionsModule,
    TabsPageModule,
    LoginScreenModule,
    BrowserModule.withServerTransition({
      appId: 'ng-universal-demystified'
    })
  ],
  exports: [RouterModule],
  providers: [
    //StatusBar,
    //SplashScreen,
    //AuthFirebaseService,
    //{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}