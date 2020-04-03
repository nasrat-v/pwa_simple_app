import { Component, OnInit } from '@angular/core';
//import { Plugins } from '@capacitor/core';
//import { ToastController } from '@ionic/angular';
import { GoogleMapsService } from '../services/google-maps.service';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute, 
    //public toastController: ToastController
  ) {}

  ngOnInit() {
    // call get current location function on initializing
    let lat = this.activatedRoute.snapshot.paramMap.get('lat');
    let lon = this.activatedRoute.snapshot.paramMap.get('lon');
    if (lat && lon) {
      this.lat = parseFloat(lat);
      this.lng = parseFloat(lon);
    } else {
      this.getCurrentLocation();
    }
  }

  // Function to get the current geo position of the device
   private async getCurrentLocation() {
    this.googleMapsService.getCurrentLocation().then(
      location => {
        this.lat = location[0];
        this.lng = location[1];
      });
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