import { Component, OnInit } from '@angular/core';

import { AperoService, Apero } from 'src/app/services/apero.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-apero-list',
  templateUrl: './apero-list.page.html',
  styleUrls: ['./apero-list.page.scss'],
})
export class AperoListPage implements OnInit {

  public aperos: Apero[];
  public today = new Date();

  constructor(private aperoService: AperoService
    , private userService: UserService) {
  }

  async ngOnInit() {
    this.aperoService.getAperos().then(
      aperos => {
        this.aperos = aperos;
        console.log(this.aperos)
      }
    );
  }

  public isToday(dateStr: string) {
    var date = new Date(dateStr);

    return this.today.getDate() == date.getDate() &&
            this.today.getMonth() == date.getMonth() &&
            this.today.getFullYear() == date.getFullYear();
  }

  getUserNameById(user_id: string) {
    console.log("on demande user_name");
    return new Promise((resolve, reject) => {
      this.userService.getUserNameById(user_id).then(
        user_name => {
          console.log(user_name);
          resolve(user_name)
        }
      );
    })
  }

  //fonction à utiliser grace aux notification push
  //user_id et apero_id
  joinApero() {
    //this.aperoService.joinApero("ITaggEVnWNavtUaFHG9X2dOs6CB2", "XKphGpO6Gb5AiGER4jnT");

  }

  getPermission() {
    //this.fcm.getPermission().subscribe();
  }

}
