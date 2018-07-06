import {
	Component,
	OnInit,
	ComponentFactoryResolver,
	ViewChild,
	ViewContainerRef
} from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
	public projet_page = "projet_page";
	public editPAGEstatus: boolean = false;
	public projectPageEditStatus: boolean = false;
	public ckeditorContent: any;
	public toDoAction: string;
	public prData: any;
	public erew: any;
	public editAct: string = "EditAct";
	public addAct: string = "AddAct";
	public btnButtontext = "ADD A NEW PROJECT";
	
	@ViewChild("newRef", {
		read: ViewContainerRef
	})
	attachView: ViewContainerRef;

	constructor(
		public g: Globals,
		private componentFactoryResolver: ComponentFactoryResolver,
		private sh: SharedNotificationService
	) {
		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
					this.projectPageEditStatus = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}

	ngOnInit() {
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "projectNEW":
					if (st.data == "end") {
						this.projectPageEditStatus = false;
						this.btnButtontext = "ADD A NEW PROJECT";
					}
					break;
				case "editProject":
					this.editProject(st.data);
					break;
				case "commEditpage":
					this.editStateChange(st.data);
					break;
				default:
					break;
			}
		});
	}

	editStateChange(st) {
		if (!st) {
			this.editPAGEstatus = false;
			this.projectPageEditStatus = false;
		} else {
			this.editPAGEstatus = true;
		}
	}

	onChange($event: any): void {
	}

	createNewPr() {
		if (!this.projectPageEditStatus) {
			this.btnButtontext = "Cancel";
			this.toDoAction = this.addAct;
			this.prData = null;
			setTimeout(() => {
				this.projectPageEditStatus = true;
			}, 330);
		} else {
			this.btnButtontext = "ADD A NEW PROJECT";
			this.projectPageEditStatus = false;
		}
	}

	editProject(i) {
		this.btnButtontext = "Cancel";
		this.toDoAction = this.editAct;
		this.prData = i;
		setTimeout(() => {
			this.projectPageEditStatus = true;
		}, 330);
	}
}
