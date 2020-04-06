import { Component } from '@angular/core';

import { AperoService, Apero } from 'src/app/services/apero.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public aperos: Apero[];
  public nbUsers: number;

  constructor(private aperoService: AperoService
    , private userService: UserService) {}

  async ngOnInit() {
    this.aperoService.getAperos().then(
      aperos => {
        this.aperos = aperos;
      }
    );
    this.userService.getNbUsers().then(
      nbUsers => {
        this.nbUsers = parseInt(nbUsers);
      }
    );
  }
}