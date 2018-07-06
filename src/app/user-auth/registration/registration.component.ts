import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ComponentFactoryResolver,
  ViewEncapsulation,
  ViewContainerRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiHttpService } from '../../services/api-http/api-http.service';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { NotifComponent } from '../notif/notif.component';
import { NotifRegisterComponent } from './notif-register/notif-register.component';
import { PageLoginComponent } from '../page-login/page-login.component';
import { ValidateOrgtypes } from '../../services/validators/own.validator';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Globals } from './../../globals/globals';
@Component({
  selector: 'app-registration',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public img_bg: string;
  public fileFlag = false;
  public invitationdd: any;
  public byinvitation = false;
  public registerForm: FormGroup;
  fileError: any = false;
  used_email = false;
  private form_el: ElementRef;
  public fileSelectName = '';
  @ViewChild('attachAll', {
    read: ViewContainerRef,
  })
  attachView: ViewContainerRef;
  /*   geoTypes: ['(regions)', '(cities)'], */
  userSettings: any = {
    showSearchButton: false,
    showRecentSearch: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Adresse: City, Country ......',
  };
  public register_pre = true;
  public em_empty = false;
  public orgType: any = [];
  public invitationID = '';
  passNotEqual = false;
  localAdded = false;
  orgAddr = '';
  private agreeTermsOfService = false;
  constructor(
    public g: Globals,
    private el: ElementRef,
    private apiHttp: ApiHttpService,
    private auth: AuthserviceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private activRoute: ActivatedRoute,
    private sh: SharedNotificationService
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.invitationID = params_['id_invitation'];
    });
    /* this.img_bg = this.g.base_href + 'assets/img/bg-0.png'; */
    this.img_bg = this.g.base_href + 'assets/img/imgbanner-100.jpg';
    this.getOrgtype();
  }
  async getOrgtype() {
    try {
      const gD: any = await this.auth.getallOrgTypes();
      if (gD) {
        if (gD.status === 'OK') {
          this.orgType = gD.data;
        }
      }
    } catch (e) {}
  }

  autoCompleteCallback1(selectedData: any) {
    if (selectedData.response) {
      this.orgAddr = JSON.stringify(selectedData.data);
      this.localAdded = true;
    } else {
      this.orgAddr = '';
      this.localAdded = false;
    }
  }

  async ngOnInit() {
    this.registerForm = new FormGroup({
      bhemail: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      bh_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      bh_pass_conf: new FormControl('', [Validators.required, Validators.minLength(8)]),
      bh_lastname: new FormControl('', [Validators.required]),
      bh_firstname: new FormControl('', [Validators.required]),
      bh_functions: new FormControl('', [Validators.required]),
      bh_acc_commercial: new FormControl('', [Validators.required]),
      bh_acc_activityArea: new FormControl(0, [Validators.required]),
      bh_orgType: new FormControl(0, [Validators.required, ValidateOrgtypes]),
      bh_orgLocal: new FormControl(''),
    });

    if (this.invitationID) {
      const rec_check = await this.auth.checkInvitationState({ invitID: this.invitationID });
      if (rec_check['status'] === 'OK') {
        this.invitationdd = rec_check['data'];
        this.registerForm.patchValue({
          bhemail: this.invitationdd.dataDetails.invitation_email,
          bh_lastname: this.invitationdd.dataDetails.lastname,
          bh_firstname: this.invitationdd.dataDetails.firstname,
          bh_acc_commercial: this.invitationdd.dataDetails.organisationName,
        });
        this.byinvitation = true;
      }
    }
  }

  onFormSubmit() {
    const formEl: HTMLInputElement = this.el.nativeElement.querySelector('#registerForm_');
    const hasFile = this.formImUpload();
    const credential = {
      email: this.registerForm.value.bhemail,
      lastname: this.registerForm.value.bh_lastname,
      firstname: this.registerForm.value.bh_firstname,
      password: this.registerForm.value.bh_pass,
      function: this.registerForm.value.bh_functions,
      enseigneCommerciale: this.registerForm.value.bh_acc_commercial,
      activityArea: this.registerForm.value.bh_acc_activityArea,
      Logo: '',
      typeOrganisation: this.registerForm.value.bh_orgType,
      adresse: this.orgAddr,
    };

    if (this.byinvitation) {
      credential['invitationId'] = this.invitationID;
    }

    hasFile.then((resFile: any) => {
      if (resFile.status === 0) {
        this.fileError = true;
      } else {
        credential.Logo = resFile.data.imID;
        this.auth.register(credential).subscribe(
          (r: any) => {
            this.register_pre = false;
            this.notifAndLogin();
          },
          err => {
            if (err.status === 409) {
              this.used_email = true;
            }
          }
        );
      }
    });
  }

  formImUpload() {
    // event.preventDefault();
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#logoFile');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    const promise = new Promise((resolve, reject) => {
      if (fileCount === 0) {
        resolve({
          status: 0,
          data: null,
        });
      } else {
        formData.append('im_up', inputEl.files.item(0), inputEl.files.item(0).name);
        this.apiHttp
          .postUpImages(formData)
          .toPromise()
          .then((resp: any) => {
            if (resp.status === 'OK') {
              resolve({
                status: 1,
                data: resp,
              });
            }
          });
      }
    });
    return promise;
  }

  /* Show notification after registration */
  private notifAndLogin() {
    const factoryNotif = this.componentFactoryResolver.resolveComponentFactory(NotifRegisterComponent);
    const refNotif = this.attachView.createComponent(factoryNotif);
    /* refNotif.instance.message =
      '" Great ! Now, to confirm the creation of your account,Click on the link sent by email"'; */
    // ref.changeDetectorRef.detectChanges();
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

  /*Chech if password typed is the same*/
  public passCheck() {
    if (this.registerForm.value.bh_pass !== '' && this.registerForm.value.bh_pass_conf !== '') {
      if (this.registerForm.value.bh_pass !== this.registerForm.value.bh_pass_conf) {
        this.passNotEqual = true;
      } else {
        this.passNotEqual = false;
      }
    }
  }

  getUrl() {
    return 'url(' + this.img_bg + ')';
  }

  upImChanged(event, id) {
    const inpt: HTMLInputElement = this.el.nativeElement.querySelector('#' + id);
    const lbs: HTMLInputElement = this.el.nativeElement.querySelector('#fileNameSelected');
    let fileName = '';
    if (inpt.files && inpt.files.length > 1) {
      fileName = inpt.files.length.toString() + ' selected';
    } else {
      fileName = event.target.value.split('\\').pop();
    }

    if (fileName) {
      lbs.innerHTML = fileName;
      this.fileFlag = true;
    } else {
      lbs.innerHTML = 'Error';
      this.fileFlag = false;
    }
  }

  activeRegistersubmit(): boolean {
    return (
      !this.registerForm.valid ||
      this.registerForm.value.bh_pass_conf !== this.registerForm.value.bh_pass ||
      this.registerForm.controls.bh_pass.untouched ||
      !this.localAdded ||
      !this.agreeTermsOfService ||
      !this.fileFlag
    );
  }
  public termsOfServices(event) {
    this.agreeTermsOfService = event.target.checked;
  }
}
