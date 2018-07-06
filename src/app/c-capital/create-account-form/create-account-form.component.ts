import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ComponentFactoryResolver,
  ViewEncapsulation,
  ViewContainerRef
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiHttpService } from "../../services/api-http/api-http.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { ValidateOrgtypes } from "../../services/validators/own.validator";
import { Router } from "@angular/router";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import { NotifComponentUser } from "../notif/notif.component";

@Component({
  selector: "create-account-form",
  templateUrl: "./create-account-form.component.html",
  styleUrls: ["./create-account-form.component.scss"]
})
export class CreateAccountFormComponent implements OnInit {
  public registerForm: FormGroup;
  private form_el: ElementRef;
  used_email: boolean = false;
  passNotEqual: boolean = false;
  public em_empty: boolean = false;

  constructor(
    public g: Globals,
    private el: ElementRef,
    private apiHttp: ApiHttpService,
    private auth: AuthserviceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private sh: SharedNotificationService
  ) {}

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

  /* Email validator complement*/
  public detectEmail() {
    if (this.registerForm.value.bhemail == "") {
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
      message: '<p>Compte créer avec succes <br> Consulter votre Boite email pour Activer votre compte.</p>',
    });
  }
}
