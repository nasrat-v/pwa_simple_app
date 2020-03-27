import { Injectable } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from './auth-firebase.service';

export interface Apero {
  _id?: number
  _id_host:  number
  _user_name_host: string,
  _lon:             number,
  _lat:             number,
  _address:          string,
  _nb_slots:         number,
  _guests:          string[],
  _nb_guests:       number,
  _date:            Date;
}

@Injectable({
  providedIn: 'root'
})
export class AperoService {
  private aperos: Apero[];
  //private aperoCollection: AngularFirestoreCollection<Apero>;
  private aperosHost:  Observable<Apero[]>;
  //private AperosCollectionHost: AngularFirestoreCollection<Apero>;

  constructor(
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

   getAperos() {
     this.aperos = [
      {_id: 0,
      _id_host:  1,
      _user_name_host: "L'apero chez toto toto",
      _lon:             42,
      _lat:             24,
      _address:          "25 rue du coq, 13001 Marseille",
      _nb_slots:         10,
      _guests:          ["titi", "tata"],
      _nb_guests:       2,
      _date:            new Date()
    }

  ];
    return this.aperos;
  }

  getApero(id: string) /*: Observable<Apero> */{
    /*return this.aperoCollection.doc<Apero>(id).valueChanges().pipe(
      take(1),
      map(apero => {
        apero._id = id;
        return apero
      })
    );*/
  }

  getAperosHost(): Observable<Apero[]> {
    return this.aperosHost;
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

  addApero(apero: Apero) /*: Promise<DocumentReference> */ {
    return ;//this.aperoCollection.add(apero);
  }

  updateApero(apero: Apero) /*: Promise<void>*/ {
    /*return this.aperoCollection.doc(apero._id).update({ 
      _id_host: apero._id_host, 
      _user_name_host: apero._user_name_host,
      _lon: apero._lon,
      _lat: apero._lat,
      _nb_slots: apero._nb_slots,
      _guests: apero._guests,
      _date: apero._date

    });*/
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
 
  deleteApero(id: string) /*: Promise<void> */{
    //return this.aperoCollection.doc(id).delete();
  }
}
