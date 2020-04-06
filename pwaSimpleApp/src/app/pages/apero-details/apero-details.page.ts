import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Apero, AperoService } from 'src/app/services/apero.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { GoogleMapsService } from '../../services/google-maps.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { User } from 'src/app/types/user.type';

declare var $: any;

@Component({
  selector: 'app-apero-details',
  templateUrl: './apero-details.page.html',
  styleUrls: ['./apero-details.page.scss'],
})
export class AperoDetailsPage implements OnInit {

  public user: User;

  libelleError = false;
  descriptionError = false;
  numberGuestError = false;
  addressError = false;
  lat: number;
  lng: number;
  address: string;
  options={
    types: [],
    componentRestrictions: { country: 'FR' }
    };

  today :string = new Date().toISOString().substring(0, 10);

  apero: Apero = {
    id: null,
    id_host: null,
    host_user_name: '',
    libelle: '',
    description: '',
    lat: null,
    lon: null,
    address: '',
    nb_slots: '',
    guests_id: [],
    date: null
  };

  constructor(private userStorageService: UserStorageService
    , private activatedRoute: ActivatedRoute
    , private aperoService: AperoService
    , private googleMapsService: GoogleMapsService
    , private router: Router) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.apero.date = new Date();
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
  
  public dateChange(date: Date) {
    this.apero.date = date;
  }

  public resetError() {
    this.libelleError = false;
    this.descriptionError = false;
    this.numberGuestError = false;
    this.addressError = false;
  }

  public checkInput() {
    if (this.apero.libelle == null || this.apero.libelle == '') {
      this.libelleError = true;
      return false;
    }
    if (this.apero.description == null || this.apero.description == '') {
      this.descriptionError = true;
      return false;
    }
    if (isNaN(parseInt(this.apero.nb_slots)) || parseInt(this.apero.nb_slots) <= 0 || parseInt(this.apero.nb_slots) > 100) {
      this.numberGuestError = true;
      return false;
    }
    if (this.apero.address == null || this.apero.address === '') {
      this.addressError = true;
      return false;
    }
    return true;
  }
 
  public addApero() {
    if (!this.checkInput()) {
      return;
    }
    this.googleMapsService.getGeoLocation(this.apero.address).toPromise().then(
      (location) => {
        this.apero.id_host = this.userStorageService.getUser().id;
        this.apero.host_user_name = this.userStorageService.getUser().user_name;
        this.apero.libelle = this.apero.libelle;
        this.apero.description = this.apero.description;
        this.apero.lat = location.lat;
        this.apero.lon = location.lon;
        this.apero.address = this.apero.address;
        this.apero.nb_slots = this.apero.nb_slots;
        this.apero.guests_id = this.apero.guests_id;
        this.apero.date = this.apero.date;
        console.log('avant add apero');
        this.aperoService.addApero(this.apero).then(
          ret => {
            console.log('apres apero');
            //this.router.navigateByUrl('tabs/apero-list');
            window.location.reload();
          });
      }, (err) => {
        console.log('error apero');
        this.addressError = true;
      });
  }
 
  async deleteApero() {

    if (this.apero != undefined) {
      let ret = await this.aperoService.deleteApero(this.apero);
      this.router.navigateByUrl('tabs/apero-list');
    }
  }
 
  async updateApero() {
    if (!this.checkInput()) {
      return;
    }
    this.googleMapsService.getGeoLocation(this.apero.address).toPromise().then(
      location => {
        this.apero.libelle = this.apero.libelle;
        this.apero.description = this.apero.description;
        this.apero.lat = location.lat;
        this.apero.lon = location.lon;
        this.apero.address = this.apero.address;
        this.apero.nb_slots = this.apero.nb_slots;
        this.apero.date = this.apero.date;
        this.aperoService.updateApero(this.apero).then(
          res => {
            this.router.navigateByUrl('tabs/apero-list');
          });
      }, (err) => {
        this.addressError = true;
      });
  }
 
  public showToast(msg) {
    /*this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());*/
  }

  @ViewChild("placesRef", null) placesRef : GooglePlaceDirective;
    
        public handleAddressChange(address: Address) {
          this.apero.address = address.formatted_address;
          this.resetError();
    }
}
