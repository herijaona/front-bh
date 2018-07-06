import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './../../../globals/globals';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';
@Component({
  selector: 'app-members-communities',
  templateUrl: './members-communities.component.html',
  styleUrls: ['./members-communities.component.scss'],
})
export class MembersCommunitiesComponent implements OnInit {
  public st: any;
  public communityShow = false;
  public userCommData: any;
  public img_avatar = '';
  public allComm = [];
  public messageUser = '';
  public anyUser = false;
  public currUserCommList = [];
  public currUserCommListSave = [];
  public currUserSelct = '';
  @ViewChild('modalSet') public myModalHist: ModalDirective;
  constructor(
    private sh: SharedNotificationService,
    public g: Globals,
    private router: Router,
    private auth: AuthserviceService,
    private tms: TeamsService
  ) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }
  public async showModal(item, usID) {
    console.log(usID);
    this.currUserSelct = usID;
    let tmpr = [];
    if (item.length > 0) {
      for (const it of item) {
        tmpr.push(it._id);
      }
    }
    let ttmp = this.userCommData.filter(el => el.us._id === usID);
    console.log('userCommData: ', ttmp);
    if (ttmp.length > 0) {
      this.currUserCommListSave = ttmp[0].community.map(x => x._id);
    }
    this.currUserCommList = tmpr;

    try {
      if (this.allComm.length === 0) {
        const dataList = await this.tms.getCommunitiesDataList();
        if (dataList['status'] === 'OK') {
          this.allComm = dataList['data'];
          console.log(this.allComm);
        }
      }

      setTimeout(() => {
        this.myModalHist.show();
      }, 330);
    } catch (e) {
      console.log(e);
    }
  }
  public hideModal() {
    setTimeout(() => {
      this.myModalHist.hide();
    }, 330);
  }
  reactOnNewCommData() {
    this.allComm = [];
  }
  async ngOnInit() {
    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case 'addedNewCommData':
          this.reactOnNewCommData();
          break;
      }
    });
    try {
      const isAdmin = await this.auth.isAdminUser();
      if (isAdmin['status'] === 'OK') {
        this.getCommunity();
      } else {
        this.router.navigateByUrl('/');
      }
    } catch (e) {}
  }

  async getCommunity() {
    this.userCommData = [];
    try {
      const cUser: any = await this.tms.getCommunityData();
      if (cUser) {
        if (cUser.status === 'OK') {
          this.userCommData = cUser.data.users;
          console.log(this.userCommData);
          this.communityShow = true;
        } else {
          this.messageUser = cUser.message;
          this.anyUser = true;
        }
      }
    } catch (e) {}
  }

  getDateString(dt) {
    return new Date(dt).toDateString();
  }

  changeState(ev, _id) {
    const s = ev.target.checked;
    if (s) {
      this.currUserCommList.push(_id);
    } else {
      const x = this.currUserCommList.indexOf(_id);
      this.currUserCommList.splice(x, 1);
    }
    console.log(this.currUserCommList);
  }

  checkIfIn(idd) {
    for (const iter of this.currUserCommList) {
      if (iter === idd) {
        return true;
      }
    }
    return false;
  }

  async saveUserCommunitiesChange() {
    if (!this.icheckChange()) {
      return;
    }
    try {
      const saveResponse = await this.tms.saveUserCommunityData({
        dataComm: this.currUserCommList,
        usedID: this.currUserSelct,
      });
      if (saveResponse['status'] === 'OK') {
        this.myModalHist.hide();
        this.sh.notifToast({
          type: 'success',
          message: '<p>' + saveResponse['message'] + '</p>',
        });
        this.getCommunity();
      }
    } catch (e) {
      console.log(e);
    }
  }
  icheckChange() {
    console.log(this.currUserCommList);
    console.log(this.currUserCommListSave);
    if (this.currUserCommList.length === 0 && this.currUserCommListSave.length === 0) {
      return false;
    }
    if (this.currUserCommList.length === this.currUserCommListSave.length) {
      let c = 0;
      for (const ie of this.currUserCommList) {
        for (const ia of this.currUserCommListSave) {
          if (ie === ia) {
            c++;
          }
        }
      }
      if (c === this.currUserCommList.length) {
        return false;
      }
    }
    console.log('folle dingue');
    console.log(true);
    return true;
  }
}
