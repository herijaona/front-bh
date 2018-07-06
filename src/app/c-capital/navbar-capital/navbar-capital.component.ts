import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Globals } from './../../globals/globals';
import { ModalDirective } from 'angular-bootstrap-md';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { Router } from '@angular/router';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { ServicesModal } from '../services/services-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar-capital',
  templateUrl: './navbar-capital.component.html',
  styleUrls: ['./navbar-capital.component.scss'],
})
export class NavbarCapitalComponent implements OnInit, OnDestroy {
  public header_page_logo: string = this.g.base_href + 'assets/img/logo-collaboration.png';
  public logo_cca: string = this.g.base_href + 'assets/img/logo-cca.png';
  public login_cca: string = this.g.base_href + 'assets/img/login.png';
  public mdp_cca: string = this.g.base_href + 'assets/img/mdp.png';
  public all_know: string = this.g.base_href + 'assets/img/toutsavoir.png';
  public view_cca: string = this.g.base_href + 'assets/img/voir.png';
  public show: boolean;

  public loginForm: FormGroup;
  public resetpassForm: FormGroup;
  public notifReset: boolean = false;
  public loginFormFlag: boolean = true;
  type_ = 'notif';
  text_ = 'Success de registration';
  error_log: boolean = false;
  subscription: Subscription;

  @ViewChild('modalconect') connModal: ModalDirective;
  @ViewChild('modalregister') registerModal: ModalDirective;
  @ViewChild('modalpass') passModal: ModalDirective;

  constructor(
    public g: Globals,
    public auth: AuthserviceService,
    private router: Router,
    private sh: SharedNotificationService,
    private serviceModal: ServicesModal
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.resetpassForm = new FormGroup({
      bhemail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
    });

    this.loginForm = new FormGroup({
      bhemail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      bh_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.subscription = this.serviceModal._item.subscribe(item => {
      if (!item) {
        this.addModalconn();
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addModalconn() {
    setTimeout(() => {
      this.connModal.show();
    }, 330);
  }
  closemodalsstr() {
    this.connModal.hide();
    setTimeout(() => {}, 330);
  }
  addModalregister() {
    setTimeout(() => {
      this.registerModal.show();
    }, 330);
  }
  closemodaregister() {
    this.registerModal.hide();
    setTimeout(() => {}, 330);
  }

  password() {
    this.show = !this.show;
  }

  onFormSubmit() {
    let credential = {
      email: this.loginForm.value.bhemail,
      password: this.loginForm.value.bh_pass,
    };
    this.auth.login(credential).then(
      (data: any) => {
        this.auth.profile().then(
          (res: any) => {
            this.connModal.hide();
            this.router.navigateByUrl(this.router.url);
          },
          err => {
            this.sh.notifToast({
              type: 'warning',
              message: '<p>Erreur inattendu</p>',
            });

            setTimeout(() => {
              this.auth.logout();
            }, 2000);
          }
        );
      },
      error => {
        this.error_log = true;
        this.text_ = error.message;
        this.type_ = 'danger';
      }
    );
  }

  closeModalConn() {
    this.connModal.hide();
    setTimeout(() => {
      this.passModal.show();
    }, 400);
  }

  resetFormSubmit() {
    var afterSubmit = new Promise((resolve, reject) => {
      this.auth
        .requestresetpass({ email: this.resetpassForm.value.bhemail })
        .toPromise()
        .then(
          (res: any) => {
            setTimeout(() => {
              if (res.status == 'OK') {
                this.passModal.hide();
                this.type_ = 'success';
                this.text_ =
                  'Demande de reinitialisation de mot passe effectuer avec success <br>' +
                  res.message +
                  ' <br> Veuiller consulter votre email .';
              } else {
                this.type_ = 'warning';
                this.text_ = 'Un erreur est survenue au cours de votre demande<br>' + res.message + ' <br> Merci.';
              }
              this.resetpassForm.reset();
              this.error_log = true;
            }, 1000);
          },
          error => {
            this.type_ = 'warning';
            this.text_ = 'Un erreur est survenue au cours de votre demande<br>' + error.error.text + ' <br> Merci.';
            this.resetpassForm.reset();
            this.error_log = true;
          }
        );
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl(this.router.url);
  }
}
