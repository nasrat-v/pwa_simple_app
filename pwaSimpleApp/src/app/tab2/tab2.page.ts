import { Component, OnInit } from '@angular/core';
//import { Plugins } from '@capacitor/core';
//import { ToastController } from '@ionic/angular';
import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  lat: number;
  lng: number;
  address: string;

  constructor(
    private googleMapsService: GoogleMapsService,
    //public toastController: ToastController
  ) {}

  ngOnInit() {
    // call get current location function on initializing
    this.getCurrentLocation();
  }

  // Function to get the current geo position of the device
   private getCurrentLocation() {
    if (navigator.geolocation) {
      console.log("nav ok");
      let ret = navigator.geolocation.getCurrentPosition(function(position) {
        console.log("position ok");
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat);
        console.log(this.lng);
        this.googleMapsService.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
          this.address = decodedAddress;
          console.log(this.address);
        });
        //this.showPosition(position);
      }, function(error) {
        console.log(error);
      }
      );
      console.log(ret)
    } else {
      console.log("nav ko");
      alert("Geolocation is not supported by this browser.");
    }
    /*Plugins.Geolocation.getCurrentPosition().then(result => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;

      // calling getAddress service function to decode the address
      this.googleMapsService.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
        this.address = decodedAddress;
        console.log(this.address);
      });
    });*/
  }

  // function to display the toast with location and dismiss button
  async presentToast() {
    /*const toast = await this.toastController.create({
      message: this.address,

      position: 'middle',
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    });
    toast.present();*/
  }

  // click function to display a toast message with the address
  onMarkerClick() {
    this.presentToast();
  }
}