import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";


@Component({
	selector: "presentation-side",
	templateUrl: "./presentation-side.component.html",
	styleUrls: ["./presentation-side.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class PresentationSideComponent implements OnInit {
	public current_section: string = "presentation";
	public currentCompanySlug: string = "";
	public editPAGEstatus: boolean = false;
	public presentationEditState: boolean = false;
	public editorPresentationModel: string = "";
	public presentationData: string = "...";

	constructor(
		private activRoute: ActivatedRoute,
		private sh: SharedNotificationService,
		private cs: CompanyService
	) {
		this.sh.editEvent$.subscribe((arg_: any) => {
			if (arg_.section == this.current_section) {
				if (arg_.action == "edit") {
					this.editPresentation();
				} else if (arg_.action == "save") {
					this.saveCompanyPresentation();
				}
			}
		});

		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			if (this.currentCompanySlug) {
				this.getCurrentCompanyPresentation(this.currentCompanySlug);
			}
		});

		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
					this.presentationEditState = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}

	ngOnInit() {}
	editPresentation() {
		this.presentationEditState = true;
	}
	async saveCompanyPresentation() {
		let dt = {
			description: this.editorPresentationModel
		};
		this.presentationEditState = false;
		try {
			let save_pr = await this.cs.saveCompanyPresentation(dt);
			if (save_pr) {
				if (save_pr["status"] == "OK") {
					this.getCurrentCompanyPresentation(this.currentCompanySlug);
					this.sh.notifToast({
						type: "success",
						message: "<p>Saved</p>"
					});
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	async getCurrentCompanyPresentation(slug_) {
		try {
			let presnt = await this.cs.getCompanyPresentation(slug_);
			if (presnt) {
				this.presentationData = presnt["data"].description;
				this.editorPresentationModel = presnt["data"].description;
			}
		} catch (e) {}
	}
}
