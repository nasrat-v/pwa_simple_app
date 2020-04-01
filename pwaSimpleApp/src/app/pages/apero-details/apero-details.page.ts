import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastController } from '@ionic/angular';
import { Apero, AperoService } from 'src/app/services/apero.service';
import { UserService } from 'src/app/services/user.service';
//import { GoogleMapsService } from 'src/app/services/google-maps.service';
//import { Plugins } from '@capacitor/core';
//import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-apero-details',
  templateUrl: './apero-details.page.html',
  styleUrls: ['./apero-details.page.scss'],
})
export class AperoDetailsPage implements OnInit {
  lat: number;
  lng: number;
  address: string;

  apero: Apero = {
    id: null,
    id_host:         null,
    host_email: '',
    lat:             null,
    lon:             null,
    address:         '',
    nb_slots:        null,
    guests:          [],
    date:            null
  };

  constructor(
    //public authFirebaseService: AuthFirebaseService,
              //private googleMapsService: GoogleMapsService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute, 
              private aperoService: AperoService,
              //private toastCtrl: ToastController, 
              private router: Router
              ) { }

  async ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.apero = await this.aperoService.getApero(id);
    }
  }

  /*ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.aperoService.getApero(id).subscribe(apero => {
        this.apero = apero;
      });
    }
  }*/
 
  async addApero() {
    //console.log("lalalal");
    this.apero.id_host = this.userService.getUser().id;
    this.apero.host_email = this.userService.getUser().email;
    this.apero.lat = 42;
    this.apero.lon = 24;
    this.apero.address = "25 rue du Coq, 13001 Marseille";
    this.apero.nb_slots = this.apero.nb_slots;
    this.apero.guests = this.apero.guests;
    this.apero.date = this.apero.date;

    let ret = await this.aperoService.addApero(this.apero);
    this.router.navigateByUrl('tabs/apero-list');

    /*Plugins.Geolocation.getCurrentPosition().then(result => {
       
      this.apero._lat = result.coords.latitude;
      this.apero._lon = result.coords.longitude;
      this.apero._user_name_host = this.authFirebaseService.getFirebaseAuth().auth.currentUser.email;
      this.apero._id_host = this.authFirebaseService.getFirebaseAuth().auth.currentUser.uid;
      this.apero._nb_guests = 0;


      // calling getAddress service function to decode the address
      this.googleMapsService.getAddress(this.apero._lat, this.apero._lon).subscribe(decodedAddress => {
        this.apero._address = decodedAddress;
        //console.log(this.address);
          
        this.aperoService.addApero(this.apero).then((result) => {
          console.log("apero id " + result.id);
          this.router.navigateByUrl('tabs/apero-list');
          this.showToast('Apero added');
        }, err => {
          this.showToast('There was a problem adding your idea :(');
        });
      });
    });*/
      
  }
 
  async deleteApero() {

    if (this.apero != undefined) {
      let ret = await this.aperoService.deleteApero(this.apero);
      this.router.navigateByUrl('tabs/apero-list');
    }
    /*this.aperoService.deleteApero(this.apero._id).then(() => {
      this.router.navigateByUrl('tabs//apero-list');
      this.showToast('Apero deleted');
    }, err => {
      this.showToast('There was a problem deleting your Apero :(');
    });*/
  }
 
  async updateApero() {

    if (this.apero != undefined) {
      this.apero.nb_slots = this.apero.nb_slots;
      this.apero.date = this.apero.date;

      let ret = await this.aperoService.updateApero(this.apero);
      this.router.navigateByUrl('tabs/apero-list');
    }


    /*this.aperoService.updateApero(this.apero).then(() => {
      this.showToast('Apero updated');
    }, err => {
      this.showToast('There was a problem updating your apero :(');
    });*/
  }
 
  showToast(msg) {
    /*this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());*/
  }

}
