import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
  lat: number;
  lng: number;
  address: string;

  constructor(
    private googleMapsService: GoogleMapsService,
    private activatedRoute: ActivatedRoute, 
    //public toastController: ToastController
  ) {}

  ngOnInit() {
    let lat = this.activatedRoute.snapshot.paramMap.get('lat');
    let lon = this.activatedRoute.snapshot.paramMap.get('lon');
    if (lat && lon) {
      this.lat = parseFloat(lat);
      this.lng = parseFloat(lon);
    } else {
      this.getCurrentLocation();
    }
  }

   private async getCurrentLocation() {
    this.googleMapsService.getCurrentLocation().then(
      location => {
        this.lat = location[0];
        this.lng = location[1];
      });
  }

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

  onMarkerClick() {
    this.presentToast();
  }
}