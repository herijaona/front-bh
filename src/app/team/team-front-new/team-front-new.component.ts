import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  ValidateUrl,
  ValidateYear,
  ValidatePair
} from "../../services/validators/own.validator";
import { TeamsService } from "../../services/teams/teams.service";
@Component({
  selector: "team-front-new",
  templateUrl: "./team-front-new.component.html",
  styleUrls: ["./team-front-new.component.scss"]
})
export class TeamFrontNewComponent implements OnInit, OnDestroy {
  public userNotSelected: boolean = false;
  public teamVideoForm: FormGroup;
  public idVidYouTube: { [key: string]: string } = {};
  public im_poster: string;
  public editorChanged: boolean = false;
  public cpy_entity: string = "account";
  private toDoAction: string;
  private tmvDATA: any;
  private editAct: string = "tmVEdit";
  private addAct: string = "tmVAdd";
  public teamText: string;
  public dest_file = "teamCommitee";
  public currentCompanySlug: string;
  public team_person: any;
  public cketeamText: string = "...";
  public selectedType: number = 0;
  public imData: { [key: string]: any } = {};

  @Input("do_action")
  set do_action(to_do: string) {
    this.toDoAction = to_do;
  }
  @Input("tmv_data")
  set tmv_data(tdta: any) {
    this.tmvDATA = tdta;
  }

  constructor(
    private activRoute: ActivatedRoute,
    private tms: TeamsService,
    private sh: SharedNotificationService,
    public g: Globals
  ) {
    this.teamVideoForm = new FormGroup({
      tvCaption: new FormControl("", [Validators.required]),
      tvteamMember: new FormControl(0, [Validators.required]),
      editorText: new FormControl(0, [Validators.required]),
      tvVideoUrl: new FormControl("")
    });

    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_["slug_acc"];
    });
  }

  async getallTeams() {
    try {
      const altM: any = await this.tms.getTeamUsers(this.currentCompanySlug);
      if (altM) {
        if ((altM.status = "OK")) {
          return altM.data;
        }
      }
    } catch (e) {}
  }
  ngOnInit() {
    this.sh.im_Selected$.subscribe((st: any) => {
      if (st.select) {
        if (st.destFile === this.dest_file) {
          this.imData = st.data;
          this.im_poster = this.imData.url;
        }
      }
    });

    this.getallTeams().then((dt: any) => {
      this.team_person = dt;
    });

    if (this.toDoAction === this.editAct) {
      this.teamVideoForm.setValue({
        tvCaption: this.tmvDATA["data"].caption,
        tvteamMember: this.tmvDATA["data"].team_users,
        editorTest: this.tmvDATA["data"].textTeam,
        tvVideoUrl: ""
      });
      if (this.tmvDATA.type == 1) {
        this.selectedType = 1;
        this.teamVideoForm.patchValue({
          tvVideoUrl: this.tmvDATA["data"].video_url
        });
        let i_vi = this.getIdVideo(this.tmvDATA["data"].video_url);
        if (!i_vi) {
          this.idVidYouTube = {};
        }
        this.im_poster = this.sh.getVideoImPoster(
          this.tmvDATA["data"].id_video
        );
      } else {
        this.selectedType = 0;
        this.im_poster = this.tmvDATA["data"].url;
      }
    } else if (this.toDoAction == this.addAct) {
      // code...
    }
  }

  urlSetted(ev) {
    let i_vi = this.getIdVideo(ev.target.value);
    if (!i_vi) {
      this.idVidYouTube = {};
    }
  }

  getIdVideo(r) {
    let video_id = "";
    if (!this.teamVideoForm.get("tvVideoUrl").errors) {
      video_id = r.split("v=")[1];
      let ampersandPosition = video_id.indexOf("&");
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      this.idVidYouTube = {
        im_poster: "https://img.youtube.com/vi/" + video_id + "/hqdefault.jpg",
        id_video: video_id,
        video_url: r,
        iframe_:
          "<iframe src='https://www.youtube.com/embed/" +
          video_id +
          "?controls=1&autoplay=1'></iframe>"
      };
      this.im_poster = this.sh.getVideoImPoster(this.idVidYouTube.id_video);
      return video_id;
    }
  }

  onChangeTeamUsers() {}

  async saveTeamVideoFront() {
    if (this.teamVideoForm.value.tvteamMember === 0) {
      this.userNotSelected = true;
      return;
    }
    this.userNotSelected = false;

    try {
      if (this.toDoAction == this.editAct) {
        /* if (
          this.teamVideoForm.value.tvCaption != this.tmvDATA.caption ||
          this.cketeamText != this.tmvDATA.textTeam ||
          this.idVidYouTube.id_video != this.tmvDATA.id_video
        ) { */
        /*  this.idVidYouTube['caption'] = this.teamVideoForm.value.tvCaption;
          this.idVidYouTube['team_users'] = this.teamVideoForm.value.tvteamMember;
          this.idVidYouTube['textTeam'] = this.cketeamText;
 */
        let d = {};
        if (this.selectedType == 0) {
          this.imData["team_users"] = this.teamVideoForm.value.tvteamMember;
          this.imData["caption"] = this.teamVideoForm.value.tvCaption;
          this.imData["textTeam"] = this.cketeamText;
          d = this.imData;
        } else if (this.selectedType == 1) {
          this.idVidYouTube["caption"] = this.teamVideoForm.value.tvCaption;
          this.idVidYouTube[
            "team_users"
          ] = this.teamVideoForm.value.tvteamMember;
          this.idVidYouTube["textTeam"] = this.cketeamText;
          d = this.idVidYouTube;
        }
        let tFrontGenData = { type: this.selectedType, data: d };
        let tmvUpdate: any = await this.tms.updatetmvData({
          id_: this.tmvDATA._id,
          dataUpdate: tFrontGenData
        });
        if (tmvUpdate) {
          if (tmvUpdate.status == "OK") {
            this.sh.pushData({
              from: "tmodal_new",
              data: "end"
            });
          }
          /* } */
        }
      } else if (this.toDoAction === this.addAct) {
        let d: any;
        if (this.selectedType == 0) {
          this.imData["team_users"] = this.teamVideoForm.value.tvteamMember;
          this.imData["caption"] = this.teamVideoForm.value.tvCaption;
          this.imData["textTeam"] = this.cketeamText;
          d = this.imData;
        } else if (this.selectedType == 1) {
          this.idVidYouTube["caption"] = this.teamVideoForm.value.tvCaption;
          this.idVidYouTube[
            "team_users"
          ] = this.teamVideoForm.value.tvteamMember;
          this.idVidYouTube["textTeam"] = this.cketeamText;
          d = this.idVidYouTube;
        }
        let tFrontGenData = {
          type: this.selectedType,
          data: d
        };
        let resp: any = await this.tms.teamFrontSaveData(tFrontGenData);
        if (resp) {
          this.sh.pushData({ from: "tmodal_new", data: "end" });
        }
      }
    } catch (e) {}
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }

  reussiAction() {}

  onEditorChange($event) {}
  onChangeEditor(e) {
    this.cketeamText = e;
    this.editorChanged = this.textLengthCheck(e);
  }

  textLengthCheck(txt) {
    let cnt: string = txt.replace(/\n/g, "").replace(/<(?:.|\n)*?>/gm, "");
    // this.charLength = cnt.length;
    if (cnt.length > 1000) {
      return false;
    }
    return true;
  }
  onChange(vent) {}
  onReady(vent) {}

  chooseType(event) {
    this.selectedType = event.target.value;

    if (this.toDoAction === this.editAct) {
      this.teamVideoForm.setValue({
        tvCaption: this.tmvDATA["data"].caption,
        tvteamMember: this.tmvDATA["data"].team_users,
        editorTest: this.tmvDATA["data"].textTeam,
        tvVideoUrl: ""
      });
      if (this.tmvDATA.type == 1) {
        this.teamVideoForm.patchValue({
          tvVideoUrl: this.tmvDATA["data"].video_url
        });
        let i_vi = this.getIdVideo(this.tmvDATA["data"].video_url);
        if (!i_vi) {
          this.idVidYouTube = {};
        }
        this.im_poster = this.sh.getVideoImPoster(
          this.tmvDATA["data"].id_video
        );
      } else {
        this.im_poster = this.tmvDATA["data"].url;
      }
    } else if (this.toDoAction == this.addAct) {
      // code...
      this.im_poster = "";
      this.imData = {};
    }
  }

  validDataEntry() {
    if (this.selectedType == 0) {
      if ("url" in this.imData) {
        return true;
      }
    } else if (this.selectedType == 1) {
      if (
        this.teamVideoForm.value["tvVideoUrl"].startsWith(
          "https://www.youtube.com") && ('im_poster' in this.idVidYouTube) 
        
      ) {
        return true;
      }
    }
    return false;
  }
}
