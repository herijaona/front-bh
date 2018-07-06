import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Routes, RouterModule } from "@angular/router";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { ProjectsComponent } from "./projects/projects.component";
import { CKEditorModule } from "ng2-ckeditor";
import { ProjectListComponent } from "./project-list/project-list.component";
import { PModalShowComponent } from "./p-modal-show/p-modal-show.component";
import { DescriptionProjectComponent } from "./description-project/description-project.component";
import { ProjectApplyComponent } from "./project-apply/project-apply.component";

import { MindsetModule } from "../mindset/mindset.module";

@NgModule({
	imports: [
		CommonModule,
		GeneralUtilitiesModule,
		ReactiveFormsModule,
		FormsModule,
		MindsetModule,
		RouterModule,
		CKEditorModule,
		MDBBootstrapModule.forRoot()
	],
	declarations: [
		ProjectsComponent,
		ProjectListComponent,
		PModalShowComponent,
		DescriptionProjectComponent,
		ProjectApplyComponent
	],
	exports: [],
	schemas: [NO_ERRORS_SCHEMA]
})
export class ProjectsModule {}
