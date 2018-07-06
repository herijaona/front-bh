import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { Router } from '@angular/router';
import { SharedNotificationService } from '../../services/shared-notification/shared-notification.service';

import { Globals } from '../../globals/globals';
@Component({
  selector: 'page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit {
  public img_bg: string;
  public img_logo: string;
  public img_avatar: string;
  public loginForm: FormGroup;
  public resetpassForm: FormGroup;
  public notifReset = false;
  public loginFormFlag = true;
  type_ = 'notif';
  text_ = 'Success de registration';
  error_log = false;

  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    private router: Router,
    private sh: SharedNotificationService
  ) {
    this.img_bg = this.g.base_href + 'assets/img/bg-accueil.jpg';
    this.img_avatar = this.g.base_href + 'assets/img/bg-accueil.jpg';
    this.img_logo = this.g.base_href + 'assets/img/logo-cca.png';
  }
  ngOnInit() {
    this.resetpassForm = new FormGroup({
      bhemail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
    });

    this.loginForm = new FormGroup({
      bhemail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      bh_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  getUrl() {
    return 'url(' + this.img_bg + ')';
  }
  async onFormSubmit() {
    const credential = {
      email: this.loginForm.value.bhemail,
      password: this.loginForm.value.bh_pass,
    };
    try {
      const loginResp = await this.auth.login(credential);
      if (loginResp) {
        this.router.navigateByUrl('/administration-in/collaborations');
        return;
      }
    } catch (err) {
      console.log(err);
      this.error_log = true;
      this.text_ = err.message;
      this.type_ = 'danger';
    }
    /* this.auth.login(credential).then(
      (data: any) => {
        this.router.navigateByUrl('/administration-in/collaborations');
      },
      error => {
        this.error_log = true;
        this.text_ = error.message;
        this.type_ = 'danger';
      }
    ); */
  }

  forgotPasswordInit(e) {
    e.preventDefault();
    if (this.loginFormFlag) {
      this.loginFormFlag = false;
      this.loginForm.reset();
    } else {
      this.loginFormFlag = true;
      this.resetpassForm.reset();
    }
    this.error_log = false;
  }

  resetFormSubmit() {
    const afterSubmit = new Promise((resolve, reject) => {
      this.auth
        .requestresetpass({ email: this.resetpassForm.value.bhemail })
        .toPromise()
        .then(
          (res: any) => {
            setTimeout(() => {
              if (res.status === 'OK') {
                this.type_ = 'success';
                this.text_ =
                  'Request for password reset to perform with success<br>' +
                  res.message +
                  ' <br>Please consult your email.';
              } else {
                this.type_ = 'warning';
                this.text_ = 'An error occurred during your request<br>' + res.message + ' <br> Thank you.';
              }
              this.resetpassForm.reset();
              this.error_log = true;
            }, 1000);
          },
          error => {
            this.type_ = 'warning';
            this.text_ = 'An error occurred during your request<br>' + error.error.text + ' <br> Thank you.';
            this.resetpassForm.reset();
            this.error_log = true;
          }
        );
    });
  }
}
