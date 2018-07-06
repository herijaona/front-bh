import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project1Component } from './project1/project1.component';
import { NavbarCapitalComponent } from './navbar-capital/navbar-capital.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { RequestInfoComponent } from './request-info/request-info.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotifComponentUser } from './notif/notif.component';
import { OptionListComponent } from './project1/option-list/option-list.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { EntrepriseComponent } from './entreprises/entreprises.component';
import { RouterModule } from '@angular/router';
import { TabsComponent } from './core/tabs/tabs.component';
import { ServicesModal } from './services/services-modal';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MDBBootstrapModule.forRoot(), FormsModule,RouterModule],
  declarations: [
    Project1Component,
    NavbarCapitalComponent,    
    TabsComponent,
    CreateAccountFormComponent,
    RequestInfoComponent,
    ProjectDescriptionComponent,
    NotifComponentUser,
    OptionListComponent,
    AcceuilComponent,
    EntrepriseComponent
  ],
  exports: [NavbarCapitalComponent],
  providers: [
    ServicesModal
  ]
})
export class CCapitalModule {}
