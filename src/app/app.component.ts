import { Component } from "@angular/core";
import { NavbarModule } from "./navbar/navbar.module";
import { Subscription } from "rxjs/Subscription";
import { SharedNotificationService } from "./services/shared-notification/shared-notification.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "Business Haven";
	private subscr: Subscription;
	public spinnerload: boolean = false;
	constructor(private sh: SharedNotificationService) {
		this.subscr = this.sh.run_loader$.subscribe((mess: any) => {
			if (mess.action == "show") {
				setTimeout(() => {
					this.spinnerload = true;
				}, 300);
			} else if (mess.action == "hide") {
				setTimeout(() => {
					this.spinnerload = false;
				}, 300);
			}
		});
	}
}
