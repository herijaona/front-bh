import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from './../../../globals/globals';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
@Component({
  selector: 'members-admin',
  templateUrl: './members-admin.component.html',
  styleUrls: ['./members-admin.component.scss'],
})
export class MembersAdminComponent implements OnInit {
  public team_page: string = 'team_page';
  public details: any;
  public img_avatar: string;
  public activated: boolean = false;
  public readyData: boolean = false;
  public userAdminData: any;
  public userInvitedData: any;
  public inviteForm: FormGroup;

  public st: any;

  public adminAll: boolean = true;
  public invitedShow: boolean = false;
  constructor(
    public g: Globals,
    private router: Router,
    private sh: SharedNotificationService,
    private tms: TeamsService,
    private auth: AuthserviceService,
    private titl: Title
  ) {
    this.titl.setTitle('Admin Team');

    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
    this.inviteForm = new FormGroup({
      lastname: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      invAsTeam: new FormControl(true),
      invAsComm: new FormControl(false),
      email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), Validators.required]),
    });
  }
  async ngOnInit() {
    try {
      this.auth.userDataRole();
      let isAdmin = await this.auth.isAdminUser();
      if (isAdmin['status'] === 'OK') {
        this.getProfile();
        this.getMember();
        this.getInvitationSend();
      } else {
        this.router.navigateByUrl('/');
      }
    } catch (e) {}
  }
  async getProfile() {
    try {
      let prdata: any = await this.auth.profile();
      if (prdata) {
        if (prdata.active) {
          this.activated = true;
          this.details = prdata;
          this.readyData = true;
          return prdata;
        } else {
          throw new Object({
            type: 'NotActivate',
          });
        }
      }
    } catch (ee) {
      this.readyData = true;
      if ('type' in ee) {
        if (ee.type === 'NotActivate') {
          this.activated = false;
        }
      } else {
        this.auth.logout();
      }
    }
  }
  gotoProfileEdit() {
    this.router.navigateByUrl('/administration-in/user/profile');
  }
  async submitinvite() {
    try {
      var data: any = this.inviteForm.value;
      var teamInviteRes: any = await this.tms.inviteTeam(data);
      if (teamInviteRes.status === 'OK') {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Invitation sent</p>',
        });
        this.inviteForm.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getMember() {
    try {
      let team_data: any = await this.tms.getTeamData();
      if (team_data) {
        this.userAdminData = team_data.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async teamCommChange(ev, ent, it) {
    try {
      let d: {
        [key: string]: any;
      } = {};
      if (ent == 'tAdm') {
        d = {
          _id: it._id,
          value: !it.isAdm,
          reg: 'adm',
        };
      } else if (ent == 'comm') {
        d = {
          _id: it._id,
          value: !it.isComm,
          reg: 'com',
        };
      }
      let r: any = await this.tms.changeRoleAdmin(d);
      if (r) {
        if (r.status == 'OK') {
          this.userAdminData = [];
          this.getMember();
        }
      }
    } catch (e) {}
  }
  async deleteFromTeamList(it) {
    try {
      let rm: any = await this.tms.deleteFromTeamList({
        usr_id: it._id,
      });
      if (rm) {
        if (rm.status == 'OK') {
          this.userAdminData = [];
          this.getMember();
        }
      }
    } catch (e) {}
  }

  viewUsersTeams(scp) {
    switch (scp) {
      case 'admin':
        this.adminAll = true;
        this.invitedShow = false;
        break;
      case 'community':
        this.adminAll = false;
        this.invitedShow = true;
        break;
      default:
        break;
    }
  }

  async getInvitationSend() {
    try {
      const allInvitation: any = await this.tms.getAllInvitationSent();
      if (allInvitation.status === 'OK') {
        let i = 0;
        for (const it of allInvitation.data) {
          allInvitation.data[i].dateAdd = new Date(it.dateAdd).toDateString();
          i++;
        }
        this.userInvitedData = allInvitation.data;
      }
    } catch (e) {}
  }

  async reviveInvitation(itemID) {
    try {
      let rvv: any = await this.tms.reviveInvitation(itemID);
      if (rvv.status === 'OK') {
        this.sh.notifToast({ type: 'success', message: rvv.message });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
