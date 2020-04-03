import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserCredentials, UserLocation } from '../types/user.type';
import { UserService } from '../services/user.service';
import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'register-screen',
  templateUrl: 'register-screen.html',
  styleUrls: ['register-screen.scss']
})

export class RegisterScreen implements OnInit {
  
  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    var userCreds: UserCredentials = {
      email: this.getForm().email.value,
      user_name: this.getForm().username.value,
      password: this.getForm().password.value,
      user_loc: { lat: -1, lon: -1 }
    };
    this.signUp(userCreds);
  }

  public getForm() {
    return this.registerForm.controls;
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

  private signUp(userCreds: UserCredentials) {
    this.loading = true;

    this.setUserLocation((userLoc: UserLocation) => {
      userCreds.user_loc = userLoc;

      this.userService.createUser(userCreds).then(ret => {
        this.loading = false;
        this.router.navigate(['/']);
      }, (err) => {
        this.loading = false;
        this.isErrorInput = true;
        this.errorInputMsg = err.msg;
      });
    });
  }
}
 