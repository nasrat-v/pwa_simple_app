import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { UserStorageService } from './user-storage.service';


export interface Apero {
  id?: number,
  id_host: number,
  host_user_name: string,
  libelle: string,
  description: string,
  lat: number,
  lon: number,
  address: string,
  nb_slots: string,
  guests_id: string[],
  date: Date
}

@Injectable({
  providedIn: 'root'
})
export class AperoService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private userStorageService: UserStorageService
            ) {}

   getAperos():Promise<Apero[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Apero[]>("http://127.0.0.1:3000/getAperos?aperos_id=" + this.userStorageService.getUser().aperos_id).toPromise().then(
        aperos => {
          aperos.forEach( (apero, AperoIndex) => {
            aperos[AperoIndex].guests_id.forEach ( (guest_id, guestIndex) => {
              if (parseInt(aperos[AperoIndex].guests_id[guestIndex]) == this.userStorageService.getUser().id)
                aperos[AperoIndex].guests_id[guestIndex] = "Me";
              else {
                this.userService.getUserNameById(aperos[AperoIndex].guests_id[guestIndex]).then(
                  user_name => {
                    aperos[AperoIndex].guests_id[guestIndex] = user_name;
                  })
              }
            })
          });
          resolve(aperos);
        },
        err => {
          reject(err.error);
        });
    });
  }

  getApero(apero_id: string) : Promise<Apero> {
    return new Promise((resolve, reject) => {
      this.http.get<Apero>("http://127.0.0.1:3000/getApero?apero_id=" + apero_id).toPromise().then(
        apero => {
          console.log("apero receveid" + apero);
          apero.guests_id.forEach( (guest_id, index) => {
            if (parseInt(apero.guests_id[index]) == this.userStorageService.getUser().id)
            apero.guests_id[index] = "Me";
              else {
                this.userService.getUserNameById(apero.guests_id[index]).then(
                  user_name => {
                    apero.guests_id[index] = user_name;
                  })
              }
          });
          resolve(apero);
        },
        err => {
          reject(err.error);
        });
    });
  }

  addApero(newApero: Apero) /*: Promise<DocumentReference> */ {
    console.log(newApero);
    return new Promise((resolve, reject) =>{
      this.http.post<Apero>("http://127.0.0.1:3000/addApero", newApero).toPromise().then(
        apero => {
          resolve(apero);
        },
        err => {
          reject(err.error);
        }
      )
    });
  }

  updateApero(newApero: Apero) /*: Promise<void>*/ {
    return new Promise((resolve, reject) =>{
      this.http.put<Apero>("http://127.0.0.1:3000/updateApero", newApero).toPromise().then(
        apero => {
          resolve(apero);
        },
        err => {
          reject(err.error);
        }
      )
    });
  }

  joinApero(user_id: string, id: string) {
  }
 
  deleteApero(apero: Apero) /*: Promise<void> */{
    return new Promise((resolve, reject) =>{
      this.http.delete("http://127.0.0.1:3000/deleteApero?apero_id=" + apero.id).toPromise().then(
        response => {
          resolve(response);
        },
        err => {
          reject(err.error);
        }
      )
    });
  }
}
