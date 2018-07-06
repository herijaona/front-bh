import { Component, OnInit, OnDestroy } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { ProjectsService } from "../../services/projects/projects.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-description-project",
	templateUrl: "./description-project.component.html",
	styleUrls: ["./description-project.component.scss"]
})
export class DescriptionProjectComponent implements OnInit, OnDestroy {
	public projet_page: string = "projet_page";
	public currentCompanySlug: string;
	public collabTypedescr: string = '';
	public detailsData: any;
	public project_id: string;
	public hasData: boolean = false;
	constructor(
		public g: Globals,
		public sh: SharedNotificationService,
		public activRoute: ActivatedRoute,
		private router: Router,
		private auth: AuthserviceService,
		private pr: ProjectsService
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			this.project_id = params_["project_id"];
			if (this.project_id) {
				this.getProjects();
			}
		});
	}
	async getProjects() {
		try {
			let prDet: any = await this.pr.getProjectByID(this.project_id);
			if (prDet.status == "OK") {
				this.detailsData = prDet.data;
				console.log(this.detailsData);
				this.hasData = true;
				this.collabTypedescr = this.detailsData.typeCollab;
			}
		} catch (e) {
			console.log(e);
		}
	}

	ask_questions_aboutProject(ev) {
		ev.preventDefault();
		let _data = {
			objectRef: "PRT",
			objectData: this.detailsData
		};

		if (this.auth.isLoggedIn()) {
			this.sh.pushData({
				from: "p_askQuestions",
				message: "askquestions",
				data: _data
			});
		} else {
			this.sh.pushData({
				from: "p_loginModal",
				message: "askquestions",
				data: { after: _data, to: "p_askQuestions" }
			});
		}
	}

	applyto(ev) {
		ev.preventDefault();
		let _data = this.detailsData;

		if (this.auth.isLoggedIn()) {			
			this.router.navigateByUrl(
				"/" +
					[
						"administration-in",
						"collaborations",
						"apply-to",
						this.detailsData._id
					].join("/")
			);
		} else {
			this.sh.pushData({
				from: "p_loginModal",
				message: "apply",
				data: { after: _data, to: "p_applytToProjects" }
			});
		}
	}

	getDateString(dt) {
		return new Date(dt).toDateString();
	}

	ngOnInit() {}
	ngOnDestroy() {
		this.sh.pushData({});
	}
}
