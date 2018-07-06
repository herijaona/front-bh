import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ModalDirective } from "angular-bootstrap-md";
import { Subscription } from "rxjs/Subscription";

@Component({
	selector: "modal-media",
	templateUrl: "./modal-media.component.html",
	styleUrls: ["./modal-media.component.scss"]
})
export class ModalMediaComponent implements OnInit, OnDestroy {
	public currMedia: any;
	public showDataState: boolean = false;
	public c_dtype: number = 0;
	public videoZoneMindset: string = "";
	private subscr: {
		[key: string]: Subscription;
	} = {};
	public imUrl: string = "";
	@ViewChild("mdModal") myModal: ModalDirective;
	constructor(private sh: SharedNotificationService) {}

	ngOnInit() {
		this.subscr.bus = this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "showZoom":
					this.showDataState = true;
					this.currMedia = st.data;
					if (this.currMedia.dtype == 1) this.imProcessData();
					else if (this.currMedia.dtype == 2) this.vidProcessData();
					break;
				default:
			}
		});
	}
	imProcessData() {
		this.c_dtype = 1;
		this.imUrl = this.currMedia.image.url;
		setTimeout(() => {
			this.myModal.show();
		}, 100);
	}
	vidProcessData() {
		this.c_dtype = 2;
		this.videoZoneMindset = this.sh.getiframeVideo(
			this.currMedia.video.url.i_v
		);
		setTimeout(() => {
			this.myModal.show();
		}, 100);
	}

	closeModalShowZoom() {
		this.myModal.hide();
	}

	hiddedModal() {
		setTimeout(() => {
			if (this.showDataState) this.showDataState = false;
			this.c_dtype = 0;
			this.imUrl = "";
			this.videoZoneMindset = "";
		}, 200);
	}

	ngOnDestroy() {
		Object.keys(this.subscr).forEach(e => {
			this.subscr[e].unsubscribe();
		});
	}
}
