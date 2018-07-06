import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { HomesliderComponent } from './homeslider/homeslider.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
@NgModule({
  imports: [CommonModule, MDBBootstrapModule, RouterModule],
  declarations: [HomepageComponent, ListCompaniesComponent, HomesliderComponent],
  exports: [HomepageComponent, HomesliderComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomepageModule {}
