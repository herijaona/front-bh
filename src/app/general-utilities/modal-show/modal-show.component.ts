import { Component, OnInit, ViewChild , OnDestroy} from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "modal-show",
	templateUrl: "./modal-show.component.html",
	styleUrls: ["./modal-show.component.scss"]
})
export class ModalShowComponent implements OnInit, OnDestroy {
	@ViewChild("mdl_general") public myModalGen: ModalDirective;
	public askquest_mdl: boolean = false;
	public lgin_mdl: boolean = false;
	public dataModal: any;
	public modal_size: string = "md";
	public activeShow: boolean = false;
	public conf_: { [key: string]: any };
	constructor(private sh: SharedNotificationService) {
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "askQuestions":
					this.askQuestions(st);
					break;
				case "loginModal":
					this.loginModal(st);
					break;
			}
		});
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
			this.dataModal = null;
			this.modal_size = "";
		}, 100);
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

	ngOnDestroy(){

	}
}
