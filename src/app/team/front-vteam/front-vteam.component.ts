import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { TeamsService } from '../../services/teams/teams.service';
import { AuthserviceService } from '../../services/authservice/authservice.service';

@Component({
  selector: 'front-vteam',
  templateUrl: './front-vteam.component.html',
  styleUrls: ['./front-vteam.component.scss'],
})
export class FrontVteamComponent implements OnInit, OnDestroy {
  @Input('vteamDATA')
  set vteamDATA(d) {
    this.teamVideoData = d;
  }
  public disabled_btn = false;
  public teamVideoData: { [key: string]: any } = {};
  public editPAGEstatus = false;
  public tmsDetails: any = {};
  public contentEditState = false;
  public readyDT: boolean = false;
  public im_poster: string = '';
  constructor(
    private auth: AuthserviceService,
    private el: ElementRef,
    private sh: SharedNotificationService,
    private tms: TeamsService
  ) {
    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no == 'clck') {
        if (!st.state) {
          this.editPAGEstatus = false;
          this.contentEditState = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });
  }
  ngOnInit() {
    if (this.teamVideoData['type'] == 1) {
      this.im_poster = this.sh.getVideoImPoster(this.teamVideoData['data']['id_video']);
    } else if (this.teamVideoData['type'] == 0) {
      this.im_poster = this.teamVideoData['data']['url'];
    }
    this.getTeamUsers();
  }
  tmVEdit() {
    this.sh.pushData({
      from: 'tmVideoFront',
      action: 'edit',
      data: this.teamVideoData,
    });
  }
  async tmVDelete() {
    try {
      let deletionAction = await this.tms.deleteTmV(this.teamVideoData._id);
      if (deletionAction) {
        this.sh.pushData({
          from: 'tmVideoFront',
          action: 'refresh',
          message: 'OK',
        });
        this.sh.notifToast({
          type: 'success',
          message: '<p>Element Supprimé  avec success</p>',
        });
        this.el.nativeElement.remove();
      }
    } catch (e) {
      console.log(e);
    }
  }

  tmVShow() {
    this.sh.pushData({
      from: 'tmVideoFront',
      action: 'show',
      data: this.teamVideoData,
    });
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }

  ask_questions_toTeam(ev) {
    ev.preventDefault();
    let _data = {
      objectRef: 'TMV',
      objectData: this.teamVideoData,
      dtls: this.tmsDetails,
    };

    if (this.auth.isLoggedIn()) {
      this.sh.pushData({
        from: 'askQuestions',
        message: 'askquestions',
        data: _data,
      });
    } else {
      this.sh.pushData({
        from: 'loginModal',
        message: 'askquestions',
        data: { after: _data, to: 'askQuestions' },
      });
    }
  }

  async getTeamUsers() {
    try {
      let o = await this.tms.getUsersTeamsNameFn(
        this.teamVideoData['data']['team_users'],
        this.teamVideoData['account']
      );
      if (o) {
        if (o['status'] === 'OK') {
          this.readyDT = true;
          this.tmsDetails = o['data'];
        }
      }
    } catch (e) {}
  }
}
