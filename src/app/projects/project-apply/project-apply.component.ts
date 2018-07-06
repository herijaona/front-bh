import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import { ProjectsService } from "../../services/projects/projects.service";

@Component({
	selector: "project-apply",
	templateUrl: "./project-apply.component.html",
	styleUrls: ["./project-apply.component.scss"]
})
export class ProjectApplyComponent implements OnInit {
	@Input("data_")
	set data_(d) {
		this.currObj = d;
	}
	public currObj: any;
	public questionText: string;
	@Output() endMessage = new EventEmitter<{}>();
	public charLength: number;
	public changeStatus: boolean = false;
	public motivationText: string = "";
	public proposalText: string = "";
	public canBeSent: boolean = false;

	public projectApplyData = {
		mainActivityDomain: "",
		secondaryActivityDomain: "",
		skillnCompent: "",
		userActivityDescrib: "",
		dataSuppl: ""
	};
	constructor(
		public g: Globals,
		private sh: SharedNotificationService,
		private pr: ProjectsService
	) {}

	ngOnInit() {}
	onReady(e) {}

	cancelApply() {
		this.endMessage.emit({ status: "NOK", after: null, data: null });
	}

	onChangeEditor(ev) {
		let canBeSent = true;
		for (let el of Object.keys(this.projectApplyData)) {
			if (this.projectApplyData[el].length == 0) {
				canBeSent = false;
				break;
			}
		}
		this.canBeSent = canBeSent;
	}

	async sendApplicationOnProject() {
		let arg = {
			data: this.projectApplyData,
			currObj: this.currObj.data
		};
		try {
			let ret: any = await this.pr.sendProjectsApplication(arg);
			if (ret) {
				if (ret.status == "OK") {
					this.sh.notifToast({
						type: "success",
						message: "<p>Application sent</p>"
					});
					this.endMessage.emit({
						status: "OK",
						after: null,
						data: null
					});
				}
			}
		} catch (e) {}
	}

	onEditorChange($event) {}
}
