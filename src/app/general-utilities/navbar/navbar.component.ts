import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import {
	Router,
	ActivatedRoute,
	Event,
	NavigationStart,
	ResolveStart,
	NavigationEnd,
	ResolveEnd
} from "@angular/router";
import {
	trigger,
	state,
	style,
	transition,
	animate,
	keyframes
} from "@angular/animations";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"],
	animations: [
		trigger("notifToast", [
			state(
				"notifOn",
				style({
					position: "fixed",
					top: "5px",
					width: "100%",
					"z-index": 8888,
					"text-align": "center"
				})
			),
			state(
				"notifOff",
				style({
					position: "fixed",
					top: "-150px",
					width: "100%",
					"z-index": 8888,
					"text-align": "center"
				})
			),
			transition("notifOff <=> notifOn", animate("500ms ease"))
		])
	]
})
export class NavbarComponent implements OnInit {
	public st: string = "notifOff";
	public isAdmin: boolean = false;
	public accAdm: any;
	private subscr: Subscription;
	public mess_notif: string;
	public toast: boolean = false;
	public isIn: boolean = false;
	public tab = ["project1","mydesk","collaborations","administration-in","c-capital"];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public auth: AuthserviceService,
		public g: Globals,
		private sh: SharedNotificationService
	) {
		router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				let urlAfterredirects = event.urlAfterRedirects
					.trim()
					.split("/");
				this.isIn = this.inArray(this.tab, urlAfterredirects);
			}
		});
		this.sh.run_loader$.subscribe((mess: any) => {
			// this.updateState();
		});

		this.sh.notifToast$.subscribe((m: any) => {
			if (m.sc == "loadView") {
				this.updateState();
			} else {
				this.showToast(m);
			}
		});
	}

	inArray(needle, haystack) {
		var length = haystack.length;
		for(let o of needle){
		for (var i = 0; i < length; i++) {
			if (haystack[i].toString() == o.toString()) return true;
			}
		}
		return false;
	}

	ngOnInit() {
		this.updateState();
	}

	updateState() {
		let user__: any;
		setTimeout(() => {
			if (this.auth.isLoggedIn()) {
				user__ = this.auth.getUser();
				if (user__) {
					this.isAdmin = user__.isAdmin;
					this.accAdm = user__.accountAdmin;
				}
			}
		}, 1000);
	}

	showToast(dt) {
		if (dt.type) {
			// code...
			this.mess_notif = dt.message;
			this.toast = true;
			/*this.st = "notifOn";*/
			setTimeout(() => {
				this.st = "notifOff";
				setTimeout(() => {
					this.toast = false;
				}, 1000);
			}, 1200);
		}
	}
}
