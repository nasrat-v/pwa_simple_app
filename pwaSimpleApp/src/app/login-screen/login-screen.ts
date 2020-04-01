import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
//import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
// import { AuthFirebaseService } from '../services/auth-firebase.service'
import { ProfileService, Profile } from '../services/profile.service';
import { Router } from "@angular/router"
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
//import { ToastController } from '@ionic/angular';
/*import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';*/
  
  //const { PushNotifications } = Plugins;

export interface Profile {
  _id?:         '',
  _email:       '',
  _user_name:   '',
  _lon:         null,
  _lat:         null
}

export interface User {
  id: number
  email: string,
  password: string,
  aperos_id: number,
  error: string
}

@Component({
  selector: 'login-screen',
  templateUrl: 'login-screen.html',
  styleUrls: ['login-screen.scss']
})

export class LoginScreen {

  private user: User;
  username: string
  email: string;
  password: string;
  data: Observable<any>;
  //dataCollection: AngularFirestoreCollection<any>;

  constructor(
    //private authFirebaseService: AuthFirebaseService,
    private profileService: ProfileService,
    private userService: UserService,
    //private afAuth: AngularFireAuth, 
    //private afs: AngularFirestore,
    private router: Router,
    private http: HttpClient
    //public toastController: ToastController
    ) {

    

      /*this.authFirebaseService.isAuthenticated().pipe(
        tap(user => {
          if (user) {
            console.log("connecté");
          }
          else {
            console.log("deconnecté");
          }
        })
      ).subscribe()*/
  }
  

  async signup() {
    //this.authFirebaseService.signup(this.email, this.password);
    
    
        /*this.profile._email = this.email;
        this.profile._lat = 100;
        this.profile._lon = 500;
        this.profile._user_name = this.username;
        this.profileService.addProfile(this.profile);*/
        //this.profileService.
        //this.profileService.createProfile(this.email);
        //this.authFirebaseService.user.

        this.user = {
          id: null,
          email: this.email,
          password: this.password,
          aperos_id: null,
          error: ''
        };
        let ret = await this.userService.createUser(this.user);
        //console.log(ret);
        if (ret == "OK") {
          this.email = this.password = '';
          this.router.navigate(['/tabs']);
        }
        else {
          console.log("Error: " + ret);
        }       
  }

  async login() {
    this.user = {
      id: null,
      email: this.email,
      password: this.password,
      aperos_id: null,
      error: ''
    }
    let ret = await this.userService.loginUser(this.user);
    if (ret == "OK") {
      this.email = this.password = '';
      this.router.navigate(['/tabs']);
    }
    else {
      console.log("Error: " + ret);
    }
  }

  async presentToast(msg: string) {
    /*const toast = await this.toastController.create({
      message: msg,
      duration: 3500
    });
    toast.present();*/
  }

  setUserName(userName: string) {

  }

  /*anonLogin() {
    this.afAuth.auth.signInAnonymously().then(res => {
      this.user = res.user;
      //console.log(this.user);

      this.dataCollection = this.afs.collection(
        `data/${this.user.uid}/profile`,
        ref => ref.orderBy('date')
      );

    console.log(this.dataCollection);

    this.data = this.dataCollection.valueChanges();
   
  });
}


  sendToDatabase() {
    var date = new Date();
    var first = "42"
    var second = "24"
    this.user = new Date();
    console.log("push before  " + this.dataCollection)
    this.dataCollection.add({
      first,
      second,
      date
    });

    console.log("push ok  " + this.dataCollection)
  }*/

}
 