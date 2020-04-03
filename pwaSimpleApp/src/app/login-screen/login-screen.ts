import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserCredentials, UserLocation } from '../types/user.type';
import { UserService } from '../services/user.service';
import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'login-screen',
  templateUrl: 'login-screen.html',
  styleUrls: ['login-screen.scss']
})

export class LoginScreen implements OnInit {
  
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  isErrorInput = false;
  errorInputMsg = '';

  constructor(private userService: UserService
    , private googleMapsService: GoogleMapsService
    , private formBuilder: FormBuilder
    , private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    var userCreds: UserCredentials = {
      email: this.getForm().email.value,
      user_name: '',
      password: this.getForm().password.value,
      user_loc: { lat: -1, lon: -1 }
    };
    this.logIn(userCreds);
  }

  public getForm() {
    return this.loginForm.controls;
  }

  public resetError() {
    this.isErrorInput = false;
    this.errorInputMsg = '';
  }

  private setUserLocation(callback) {
    this.googleMapsService.getCurrentLocation().then(location => {
      callback({ lat: location[0], lon: location[1] });
    });
  }

  private logIn(userCreds: UserCredentials) {
    this.loading = true;

    this.setUserLocation((userLoc: UserLocation) => {
      userCreds.user_loc = userLoc;

      this.userService.loginUser(userCreds).then(ret => {
        this.loading = false;
        this.submitted = false;
        this.router.navigate(['/tabs']);
      }, (err) => {
        this.loading = false;
        this.submitted = false;
        this.isErrorInput = true;
        this.errorInputMsg = err.msg;
      });
    });
  }
}
 