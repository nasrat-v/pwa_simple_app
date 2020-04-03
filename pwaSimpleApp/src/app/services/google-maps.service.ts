import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(
    private http: HttpClient
  ) {}

  // This function makes an http call to google api to decode the cordinates
  public getAddress(lat: number, lan: number): Observable<any> {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
          environment.googleMapsApiKey
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results === 0) {
            return (null);
          }
          //console.log(geoData.results);
          return (geoData.results[0].formatted_address);
        })
      );
  }

  public async getCurrentLocation() {
    if (navigator.geolocation) {
      const res = await fetch('https://location.services.mozilla.com/v1/geolocate?key=test').then(el=>el.json())
      return ([res.location.lat, res.location.lng]);

    }
  }

  getGeoLocation(address: string): Observable<any> {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?address='${address}'&key=${
          environment.googleMapsApiKey
        }`
      )
      .pipe(
        map(geoData => {

          if (!geoData || !geoData.results || geoData.results === 0) {
            return (null);
          }
          
          return ({ 
            lat: geoData.results[0].geometry.location.lat, 
            lon: geoData.results[0].geometry.location.lng
          });
        })
      );
}

}
