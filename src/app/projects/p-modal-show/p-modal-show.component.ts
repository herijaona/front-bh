import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "pmodal-show",
	templateUrl: "./p-modal-show.component.html",
	styleUrls: ["./p-modal-show.component.scss"]
})
export class PModalShowComponent implements OnInit, OnDestroy {
	@ViewChild("p_mdl") public myModalGen: ModalDirective;
	public askquest_mdl: boolean = false;
	public lgin_mdl: boolean = false;
	public dataModal: any;
	public modal_size: string = "md";
	public activeShow: boolean = false;
	public conf_: { [key: string]: any };
	constructor(private sh: SharedNotificationService, private router: Router) {
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "p_askQuestions":
					this.activeShow = true;
					this.askQuestions(st);
					break;
				case "p_loginModal":
					this.activeShow = true;
					this.loginModal(st);
					break;
				case "p_applytToProjects":
					this.activeShow = true;
					this.applyToProjects(st);
					break;
			}
		});
	}

	public applyModal: boolean = false;

	public applyToProjects(arg) {
		this.router.navigateByUrl(
			"/" +
				["administration-in", "collaborations", "apply-to", arg.data._id].join(
					"/"
				)
		);
	}
	public loginModal(arg) {
		this.modal_size = "modal-md";
		this.dataModal = arg;
		this.lgin_mdl = true;
		this.activeShow = true;
		setTimeout(() => {
			this.myModalGen.show();
		}, 330);
	}

	public askQuestions(arg) {
		this.modal_size = "ask-modal";
		this.dataModal = arg;
		this.askquest_mdl = true;
		this.activeShow = true;
		setTimeout(() => {
			this.myModalGen.show();
		}, 430);
	}

	hiddedModal() {
		setTimeout(() => {
			this.lgin_mdl = false;
			this.askquest_mdl = false;
			this.activeShow = false;
			this.applyModal = false;
			this.dataModal = null;
			this.modal_size = "";
			/*setTimeout(() => {
				this.activeShow = true;
			}, 300);*/
		}, 300);
	}

	endMesssage(evnt) {
		if (evnt["after"]) {
			this.myModalGen.hide();
			setTimeout(() => {
				this.sh.pushData({
					from: evnt["after"],
					message: "after",
					data: evnt["data"]
				});
			}, 1000);
		} else {
			setTimeout(() => {
				this.myModalGen.hide();
			}, 200);
		}
	}

	ngOnInit() {
		this.conf_ = { backdrop: false };
	}

	ngOnDestroy() {}
}
