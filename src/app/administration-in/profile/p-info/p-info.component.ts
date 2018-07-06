import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalDirective } from "angular-bootstrap-md";
import { AuthserviceService } from "../../../services/authservice/authservice.service";
import { SharedNotificationService } from "../../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../../globals/globals";

@Component({
  selector: "p-info",
  templateUrl: "./p-info.component.html",
  styleUrls: ["./p-info.component.scss"]
})
export class PInfoComponent implements OnInit {
  public profileImageItem: any;
  public selectedImage: boolean = false;
  public dest_file: string = "profileImage";
  public cpy_entity: string = "user";
  public details: any;
  public img_avatar: string;
  public toModifyIm: boolean = false;
  @ViewChild("imProfileChanges") imModal: ModalDirective;

  @Input("details_")
  set details_(d) {
    this.details = d;
    if (this.details.imageProfile) {
      this.img_avatar = this.details.imageProfile;
    }
  }
  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    private sh: SharedNotificationService
  ) {
    this.img_avatar = this.g.base_href + "assets/img/profile-placeholder.jpg";
  }

  ngOnInit() {
    this.sh.im_Selected$.subscribe((st: any) => {
      if (st.select) {
        if (st.destFile == this.dest_file) {
          this.profileImageItem = st.data;
          this.img_avatar = this.profileImageItem.url;
          this.selectedImage = true;
        }
      }
    });
  }

  hideProfileImModal() {
    this.selectedImage = false;
    this.imModal.hide();
    this.profileImageItem = {};
    setTimeout(() => {
      this.toModifyIm = false;
    }, 500);
  }

  modifyProfileImage() {
    this.selectedImage = false;
    this.toModifyIm = true;
    this.profileImageItem = {};
    setTimeout(() => {
      this.imModal.show();
    }, 500);
  }

  async saveImProfile() {
    try {
      if (this.selectedImage) {
        let re = await this.sendDataEdit({
          imageProfile: this.profileImageItem._id
        });
        if (re == "DONE") {
          setTimeout(() => {
            this.hideProfileImModal();
          }, 500);
        }
      }
    } catch (e) {}
  }

  async sendDataEdit(arg) {
    try {
      let resp: any = await this.auth.editprofile(arg);
      if (resp.status == "OK") {
        this.sh.notifToast({
          type: "success",
          message: "<p>Saved</p>"
        });
        return "DONE";
      }
    } catch (e) {
      console.log(e);
    }
  }
}
