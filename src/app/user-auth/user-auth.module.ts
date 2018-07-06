import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GeneralUtilitiesModule } from '../general-utilities/general-utilities.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

/*service*/
import { AuthserviceService } from '../services/authservice/authservice.service';

/* Component Imports*/
import { RegistrationComponent } from './registration/registration.component';
import { ActivationComponent } from './activation/activation.component';
import { NotifComponent } from './notif/notif.component';

import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InvitedRegisterComponent } from './invited-register/invited-register.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AsideComponent } from './page-login/aside/aside.component';
import { CookieService } from 'ngx-cookie-service';
import { ReplyOrgInvitationComponent } from './reply-org-invitation/reply-org-invitation.component';
import { NotifRegisterComponent } from './registration/notif-register/notif-register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GeneralUtilitiesModule,
    FormsModule,
    MDBBootstrapModule,
    RouterModule,
    Ng4GeoautocompleteModule.forRoot(),
  ],
  entryComponents: [PageLoginComponent, NotifRegisterComponent],
  declarations: [
    RegistrationComponent,
    ActivationComponent,
    PageLoginComponent,
    NotifComponent,
    ResetPasswordComponent,
    InvitedRegisterComponent,
    SignUpComponent,
    AsideComponent,
    ReplyOrgInvitationComponent,
    NotifRegisterComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthserviceService, CookieService],
  exports: [PageLoginComponent],
})
export class UserAuthModule { }
