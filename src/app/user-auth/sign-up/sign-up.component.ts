import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from './../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public img_avatar: string;
  public img_bg: string;
  public em_empty: boolean = false;
  public used_email: boolean = false;
  public registerForm: FormGroup;
  public img_logo: string;
  public passNotEqual: boolean = false;

  constructor(
    public g: Globals,
    public auth: AuthserviceService,
    private router: Router,
    private sh: SharedNotificationService
  ) {
    if (auth.isLoggedIn()) {
      this.router.navigateByUrl('/profile');
    }
    this.img_avatar = this.g.base_href + 'assets/img/bg-accueil.jpg';
    this.img_logo = this.g.base_href + 'assets/img/bh.png';
    this.img_bg = this.g.base_href + 'assets/img/imgbanner-100.png';
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      bhemail: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      bh_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      bh_pass_conf: new FormControl('', [Validators.required, Validators.minLength(8)]),
      bh_lastname: new FormControl('', [Validators.required]),
      bh_firstname: new FormControl('', [Validators.required]),
      bh_functions: new FormControl('', [Validators.required]),
    });
  }

  /*Chech if password typed is the same*/
  public passCheck() {
    if (this.registerForm.value.bh_pass != '' && this.registerForm.value.bh_pass_conf != '') {
      if (this.registerForm.value.bh_pass != this.registerForm.value.bh_pass_conf) {
        this.passNotEqual = true;
      } else {
        this.passNotEqual = false;
      }
    }
  }

  /* Email validator complement*/
  public detectEmail() {
    if (this.registerForm.value.bhemail === '') {
      this.em_empty = true;
    } else {
      this.em_empty = false;
    }
    if (this.used_email) {
      this.used_email = false;
    }
  }

  async onFormSubmit() {
    let credential = {
      email: this.registerForm.value.bhemail,
      lastname: this.registerForm.value.bh_lastname,
      firstname: this.registerForm.value.bh_firstname,
      password: this.registerForm.value.bh_pass,
      function: this.registerForm.value.bh_functions,
    };
    try {
      let reg_res: any = await this.auth.registerMember(credential);
      if (reg_res) {
        if (reg_res.status === 'OK') {
          this.successAction();
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1000);
        }
      }
    } catch (e) {
      if (e.status === 409) {
        this.used_email = true;
      }
    }
    
  }

  successAction() {
    this.sh.notifToast({
      type: 'success',
      message: '<p>"Great ! Now, to confirm the creation of your account,Click on the link sent by email"</p>',
    });
  }

  getUrl() {
    return 'url(' + this.img_bg + ')';
  }
}
