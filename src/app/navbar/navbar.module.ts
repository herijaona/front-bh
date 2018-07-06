import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SnackbarToastComponent } from './snackbar-toast/snackbar-toast.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [SnackbarToastComponent],
	exports: []
})
export class NavbarModule {}
