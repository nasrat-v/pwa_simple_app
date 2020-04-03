import { Injectable } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { response } from 'express';


export interface Apero {
  id?: number
  id_host:  number
  host_user_name: string,
  lat:             number,
  lon:             number,
  address:          string,
  nb_slots:         string,
  guests_id:          string[],
  date:            Date;
}

@Injectable({
  providedIn: 'root'
})
export class AperoService {
  private aperos: Apero[];
  //private aperoCollection: AngularFirestoreCollection<Apero>;
  //private aperosHost:  Observable<Apero[]>;
  //private AperosCollectionHost: AngularFirestoreCollection<Apero>;

  constructor(
    private http: HttpClient,
    private userService: UserService,

    
            //public authFirebaseService: AuthFirebaseService,
            //private afs: AngularFirestore
            ) {


                
    /*this.aperoCollection = this.afs.collection<Apero>(
      `aperos/${authFirebaseService.getFirebaseAuth().auth.currentUser.uid}/apero`,
      ref => ref.orderBy('_date'));*/

    /*this.aperos = this.aperoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/

   }

   getAperos():Promise<Apero[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Apero[]>("http://127.0.0.1:3000/getAperos?aperos_id=" + this.userService.getUser().aperos_id).toPromise().then(
        aperos => {
          this.aperos = aperos;
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
          //this.aperos = aperos;
          resolve(apero);
        },
        err => {
          reject(err.error);
        });
    });
    /*return this.aperoCollection.doc<Apero>(id).valueChanges().pipe(
      take(1),
      map(apero => {
        apero._id = id;
        return apero
      })
    );*/
  }

  getAperosHost()/*: Observable<Apero[]> */
  {
    //return this.aperosHost;
  }

  getAperoHost(id: string): Observable<Apero> {
    return/* this.AperosCollectionHost.doc<Apero>(id).valueChanges().pipe(
      take(1),
      map(apero => {
        apero._id = id;
        return apero
      })
    );*/
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
    /*return this.aperoCollection.doc(apero._id).update({ 
      _id_host: apero._id_host, 
      _user_name_host: apero._user_name_host,
      _lon: apero._lon,
      _lat: apero._lat,
      _nb_slots: apero._nb_slots,
      _guests: apero._guests,
      _date: apero._date

    });*/
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
    /*this.AperosCollectionHost = this.fs.collection<Apero>(
      `aperos/${user_id}/apero`,
      ref => ref.orderBy('_date'));*/

    /*this.aperosHost = this.AperosCollectionHost.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/

    /*return this.getAperoHost(id).subscribe(apero => {
      if (apero._nb_guests < apero._nb_slots) {
        this.AperosCollectionHost.doc(apero._id).update({ 
          _id_host: apero._id_host, 
          _user_name_host: apero._user_name_host,
          _lon: apero._lon,
          _lat: apero._lat,
          _nb_slots: apero._nb_slots,
          _guests: apero._guests,
          _date: apero._date,
          _nb_guests: apero._nb_guests + 1
        });
        apero._id = '';
        apero._nb_guests += 1;
        this.addApero(apero);
      } else {
        return null;
      }
    });*/
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

    //return this.aperoCollection.doc(id).delete();
  }
}
