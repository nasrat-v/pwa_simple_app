import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
//import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
// import { AuthFirebaseService } from '../services/auth-firebase.service'
import { Router } from "@angular/router"
import { HttpClient } from '@angular/common/http';
import { UserService, User } from '../services/user.service';
import { GoogleMapsService } from '../services/google-maps.service';

//import { ToastController } from '@ionic/angular';
/*import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';*/
  
  //const { PushNotifications } = Plugins;

/*export interface User {
  id: number,
  user_name: string,
  email: string,
  password: string,
  lat: number,
  lon: number,
  aperos_id: number,
  error: string
}*/

@Component({
  selector: 'login-screen',
  templateUrl: 'login-screen.html',
  styleUrls: ['login-screen.scss']
})

export class LoginScreen {

  private user: User;
  //dataCollection: AngularFirestoreCollection<any>;

  constructor(
    private userService: UserService,
    private googleMapsService: GoogleMapsService,
    //private afAuth: AngularFireAuth, 
    //private afs: AngularFirestore,
    private router: Router,
    private http: HttpClient,
    
    //public toastController: ToastController
    ) {
      this.user = {
        id: null,
        email: '',
        password: '',
        user_name: '',
        lat: null,
        lon: null,
        aperos_id: null,
        error: ''
      };
  }
  

  signup() {

    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(this.user.email)) {
      console.log("invalid email")
      return;
    }

    if (this.user.password.length < 6) {
      console.log("invalid password")
      return;

    }

    this.googleMapsService.getCurrentLocation().then(
      location => {
        this.user.lat = location[0];
        this.user.lon = location[1];
        /*this.user = {
          id: null,
          email: this.user.email,
          password: this.user.password,
          user_name: this.user.user_name,
          lat: location[0],
          lon: location[1],
          aperos_id: null,
          error: ''
        };*/
        this.userService.createUser(this.user).then(
          ret => {
            if (ret == "OK") {
              this.user.email = this.user.password = '';
              this.router.navigate(['/tabs']);
            }
            else {
              console.log("Error: " + ret);
            }
          }
        );        
      });            
  }

  login() {
    this.googleMapsService.getCurrentLocation().then(
      location => {
        this.user.lat = location[0];
        this.user.lon = location[1];
        /*this.user = {
          id: null,
          email: this.user.email,
          user_name: '',
          password: this.user.password,
          lat: location[0],
          lon: location[1],
          aperos_id: null,
          error: ''
        }*/
        this.userService.loginUser(this.user).then(
          ret => {
            if (ret == "OK") {
              this.user.email = this.user.password = '';
              this.router.navigate(['/tabs']);
            }
            else {
              console.log("Error: " + ret);
            }
          }
        );
      })
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
 