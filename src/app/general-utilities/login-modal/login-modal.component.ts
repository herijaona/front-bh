import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { Router } from '@angular/router';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';

import { Globals } from './../../globals/globals';
@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  public currObj: any;
  @Input('data_')
  set data_(d) {
    this.currObj = d;
  }
  public img_logo: string;
  public img_avatar: string;
  public alrt_type: string;
  public msg_error: string = '';
  public loginForm: FormGroup;
  public resetpassForm: FormGroup;
  @Output() endMessage = new EventEmitter<{}>();
  public notifReset: boolean = false;
  public hasNotif: boolean = false;
  public loginFormFlag: boolean = true;
  type_ = 'notif';
  text_ = 'Success of registration';
  error_log: boolean = false;

  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    private router: Router,
    private sh: SharedNotificationService
  ) {
    this.img_avatar = this.g.base_href + 'assets/img/bg-accueil.jpg';
    this.img_logo = this.g.base_href + 'assets/img/bh.png';
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
  async onFormSubmit() {
    let credential = {
      email: this.loginForm.value.bhemail,
      password: this.loginForm.value.bh_pass,
    };

    try {
      let logRes = await this.auth.login(credential);
      if (logRes) {
        let pr = this.auth.profile();
        if (pr) {
          let aft: any = null;
          let aft_data: any = null;
          if ('after' in this.currObj.data) {
            aft = this.currObj.data.to;
            aft_data = this.currObj.data.after;
          }
          this.endAll({ status: 'OK', after: aft, data: aft_data });
        }
      }
    } catch (e) {
      console.log(e);
      this.hasNotif = false;
      this.notifMessage('warning', 'Error type: ' + e.error_type + '. Message: ' + e.message, 500);
    }
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
    var afterSubmit = new Promise((resolve, reject) => {
      this.auth
        .requestresetpass({ email: this.resetpassForm.value.bhemail })
        .toPromise()
        .then(
          (res: any) => {
            this.hasNotif = true;

            setTimeout(() => {
              if (res.status == 'OK') {
                this.notifMessage(
                  'success',
                  'Request for password reset to perform with success<br>' +
                    res.message +
                    ' <br> Please consult your email .',
                  500
                );
              } else {
                this.notifMessage(
                  'warning',
                  'An error occurred during your request<br>' + res.message + ' <br> Thank you.',
                  500
                );
              }
              this.resetpassForm.reset();
              this.error_log = true;
            }, 1000);
          },
          error => {
            this.notifMessage(
              'warning',
              'An error occurred during your request<br>' + error.error.text + ' <br> Thank you.',
              500
            );
            this.resetpassForm.reset();
            this.error_log = true;
          }
        );
    });
  }
  endAll(status) {
    this.endMessage.emit(status);
  }

  notifMessage(type, mess, time) {
    this.hasNotif = false;
    this.alrt_type = type;
    this.msg_error = mess;
    this.hasNotif = true;
    setTimeout(() => {
      this.hasNotif = false;
    }, 5000);
  }
}
