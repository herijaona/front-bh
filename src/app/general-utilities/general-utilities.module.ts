import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CKEditorModule } from 'ng2-ckeditor';
import { SectionEditButtonComponent } from './section-edit-button/section-edit-button.component';
import { EditPageButtonComponent } from './edit-page-button/edit-page-button.component';
import { ImSelectComponent } from './im-select/im-select.component';
import { BhSafeHtmlPipe } from '../pipe/bh-safe-html.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AskQuestionsComponent } from './ask-questions/ask-questions.component';
import { ModalShowComponent } from './modal-show/modal-show.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    PageHeaderComponent,
    SectionEditButtonComponent,
    EditPageButtonComponent,
    ImSelectComponent,
    AskQuestionsComponent,
    NavbarComponent,
    LoginModalComponent,
    BhSafeHtmlPipe,
    ModalShowComponent
  ],
  exports: [
    PageHeaderComponent,
    SectionEditButtonComponent,
    ImSelectComponent,
    AskQuestionsComponent,
    LoginModalComponent,
    NavbarComponent,
    EditPageButtonComponent,
    BhSafeHtmlPipe,
    ModalShowComponent
  ]
})
export class GeneralUtilitiesModule {}
