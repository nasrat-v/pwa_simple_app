import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastController } from '@ionic/angular';
import { Apero, AperoService } from 'src/app/services/apero.service';
import { UserService } from 'src/app/services/user.service';
import { GoogleMapsService } from '../../services/google-maps.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
//import {} from '@types/googlemaps';

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
  options={
    types: [],
    componentRestrictions: { country: 'FR' }
    };

    today = new Date();

  apero: Apero = {
    id: null,
    id_host:         null,
    host_user_name: '',
    lat:             null,
    lon:             null,
    address:         '',
    nb_slots:        '',
    guests_id:          [],
    date:            null
  };

  constructor(
              private userService: UserService,
              private activatedRoute: ActivatedRoute, 
              private aperoService: AperoService,
              private googleMapsService: GoogleMapsService,
              private router: Router
              ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.aperoService.getApero(id).then(
        apero => {
          this.apero = apero;
          console.log(this.apero);
        }
      );
    }
  }
 
  addApero() {
    if (isNaN(parseInt(this.apero.nb_slots)) || parseInt(this.apero.nb_slots) <= 0 || parseInt(this.apero.nb_slots) > 100) {
      console.log("guest number must be between 1 and 100");
      return;
    }
    this.googleMapsService.getGeoLocation(this.apero.address).toPromise().then(
      location => {
        if (location == null) {
          console.log("invalid address");
          return;
        }
        console.log(location.lat);
        console.log(location.lon);
        this.apero.id_host = this.userService.getUser().id;
        this.apero.host_user_name = this.userService.getUser().user_name;
        this.apero.lat = location.lat;
        this.apero.lon = location.lon;
        this.apero.address = this.apero.address;
        this.apero.nb_slots = this.apero.nb_slots;
        this.apero.guests_id = this.apero.guests_id;
        this.apero.date = this.apero.date;
        this.aperoService.addApero(this.apero).then(
          ret => {
            this.router.navigateByUrl('tabs/apero-list');
          }
        );
      }
    )      
  }
 
  async deleteApero() {

    if (this.apero != undefined) {
      let ret = await this.aperoService.deleteApero(this.apero);
      this.router.navigateByUrl('tabs/apero-list');
    }
  }
 
  async updateApero() {
    if (isNaN(parseInt(this.apero.nb_slots)) || parseInt(this.apero.nb_slots) <= 0 || parseInt(this.apero.nb_slots) > 100) {
      console.log("guest number must be between 1 and 100");
      return;
    }
    this.googleMapsService.getGeoLocation(this.apero.address).toPromise().then(
      location => {
        if (location == null) {
          console.log("invalid address");
          return;
        }
        this.apero.nb_slots = this.apero.nb_slots;
        this.apero.date = this.apero.date;
        this.apero.lat = location.lat;
        this.apero.lon = location.lon;
        this.aperoService.updateApero(this.apero).then(
          res => {
            this.router.navigateByUrl('tabs/apero-list');
          }
        );
      })
  }
 
  showToast(msg) {
    /*this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());*/
  }

  @ViewChild("placesRef", null) placesRef : GooglePlaceDirective;
    
        public handleAddressChange(address: Address) {
          this.apero.address = address.formatted_address
    }
}
