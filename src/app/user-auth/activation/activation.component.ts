import {
	Component,
	OnInit,
	OnDestroy,
	ViewChild,
	ComponentFactoryResolver,
	ViewContainerRef,
	ComponentRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiHttpService } from "../../services/api-http/api-http.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { NotifComponent } from "../notif/notif.component";
import { PageLoginComponent } from "../page-login/page-login.component";

@Component({
	selector: "app-activation",
	templateUrl: "./activation.component.html",
	styleUrls: ["./activation.component.scss"]
})
export class ActivationComponent implements OnInit, OnDestroy {
	private sub: any;
	private text_activation: string;
	@ViewChild("attachAll", { read: ViewContainerRef })
	attachView: ViewContainerRef;
	private refNotif;
	private refLogin;
	constructor(
		private route: ActivatedRoute,
		private apiHttp: ApiHttpService,
		private auth: AuthserviceService,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.text_activation = params["code"]; // (+) converts string 'id' to a number
			if (this.text_activation) {
				// code...
				this.apiHttp
					.postReqActivation({
						activation_code: this.text_activation
					})
					.subscribe(
						(resp: any) => {
							if (!this.auth.isLoggedIn()) {
								this.notifAndLogin(resp.message, "notif", true);
							} else {
								this.notifAndLogin(
									resp.message,
									"notif",
									false
								);

								var currUser = this.auth.getUser();
								if (currUser._id == resp._id) {
									currUser.active = true;
									this.auth.saveUser(currUser);
								} else {
									setTimeout(() => {
										this.auth.logout();
									}, 5000);
								}
							}
						},
						err => {
							this.notifAndLogin(
								"User Not Found",
								"error",
								false
							);
						}
					);
			}
		});
	}

	ngOnDestroy() {
		/*this.refNotif.destroy();
		this.refLogin.destroy();*/
	}

	private notifAndLogin(m, t, s) {
		var factoryNotif = this.componentFactoryResolver.resolveComponentFactory(
			PageLoginComponent
		);
		this.refNotif = this.attachView.createComponent(factoryNotif);
		this.refNotif.instance.type = "notif";
		this.refNotif.instance.message = m;

		/* if (s) {
			var factoryLogin = this.componentFactoryResolver.resolveComponentFactory(
				PageLoginComponent
			);
			var refLogin = this.attachView.createComponent(factoryLogin);
		} */

		// ref.changeDetectorRef.detectChanges();
	}
}
