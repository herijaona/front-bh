import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "invited-register",
	templateUrl: "./invited-register.component.html",
	styleUrls: ["./invited-register.component.scss"]
})
export class InvitedRegisterComponent implements OnInit {
	public img_logo: string;
  	public img_avatar: string;
	private company_slug: string = "";
	private invitation_code: string = "";
	public success: boolean = false;
	public error_data: boolean = false;
	private newpassForm: FormGroup;
	public dataUser: any;
	public readyData: boolean = false;
	constructor(
		private activ_route: ActivatedRoute,
		private auth: AuthserviceService,
		public g: Globals
	) {

	    this.img_avatar = this.g.base_href + "assets/img/bg-accueil.jpg";
	    this.img_logo = this.g.base_href + "assets/img/logo-cca.png";
		this.newpassForm = new FormGroup({
			bh_pass_conf: new FormControl("", [Validators.minLength(8)]),
			bh_new_pass: new FormControl("", [Validators.minLength(8)])
		});
	}

	ngOnInit() {
		this.activ_route.params.subscribe(params => {
			this.company_slug = params["acc_slug"];
			this.invitation_code = params["invit_id"];
			this.checkValueInvitation();
		});
	}

	async checkValueInvitation() {
		try {
			let chVal: any = await this.auth.checkInvitationVal({
				slug: this.company_slug,
				invitId: this.invitation_code
			});
			if (chVal.status == "OK") {
				this.readyData = true;
				this.dataUser = chVal.data;
			} else {
				this.error_data = true;
			}
		} catch (e) {
			this.readyData = true;
			this.error_data = true;
			console.log(e);
		}
	}
	async sumbitPass() {
		this.readyData = false;
		let dUser = {
			new_pass: this.newpassForm.value.bh_new_pass,
			user_new: this.dataUser
		};

		try {
			let w: any = await this.auth.postInvitationVal(dUser);
			if (w) {
				this.readyData = true
				if (w.status == "OK") {
					this.success = true;
				} else if (w.status == "NOK") {
					this.error_data = true;
				}
			}
		} catch (e) {
			console.log(e);
			this.readyData = true;
			this.error_data = true;
		}
	}
}
