import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { TeamsService } from '../../../../services/teams/teams.service';
import { ProjectsService } from '../../../../services/projects/projects.service';

@Component({
  selector: 'app-accepted-invitations',
  templateUrl: './accepted-invitations.component.html',
  styleUrls: ['./accepted-invitations.component.scss'],
})
export class AcceptedInvitationsComponent implements OnInit {
  public allAccepted = [];
  public allCollab = [];
  public selectedItem = {};
  public showData = false;
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  constructor(private tms: TeamsService, private pr: ProjectsService) {}
  ngOnInit() {
    this.getAcceptedInvitationData();
    this.getAllCOllaborations();
  }
  async getAcceptedInvitationData() {
    try {
      const accINvt = await this.tms.getAcceptedInvitations();
      if (accINvt['status'] === 'OK') {
        for (const fs of accINvt['data']) {
        }
        this.allAccepted = accINvt['data'];
        console.log(this.allAccepted);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllCOllaborations() {
    const allCollabResp: any = await this.pr.getAllMyCollabList();
    if (allCollabResp['status'] === 'OK') {
      this.allCollab = allCollabResp['data'];
    }
    console.log(allCollabResp);
  }

  selectCollaboration(item) {
    this.selectedItem = item;
    this.showData = true;
    this.myModalHist.show();
  }

  hideModal() {
    this.showData = false;
    this.myModalHist.hide();
  }

  checkItems(item) {
    if (this.selectedItem['collabNum'] === 0) {
      return false;
    }

    const coll = this.selectedItem['collabIn'];
    for (const it of coll) {
      if (it._id === item._id) {
        return true;
      }
    }
    return false;
  }
}
