import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../../globals/globals';
import { SharedNotificationService } from '../../../../services/shared-notification/shared-notification.service';
import { AuthserviceService } from '../../../../services/authservice/authservice.service';
import { TeamsService } from '../../../../services/teams/teams.service';

@Component({
  selector: 'app-invitations-sent',
  templateUrl: './invitations-sent.component.html',
  styleUrls: ['./invitations-sent.component.scss'],
})
export class InvitationsSentComponent implements OnInit {
  public allInv = [];
  constructor(private tms: TeamsService) {}

  ngOnInit() {
    this.getInvitationsINProgress();
  }

  async getInvitationsINProgress() {
    try {
      const inProgress = await this.tms.getInProgressInvitations();
      if (inProgress['status'] === 'OK') {
        this.allInv = inProgress['data'];
      }
    } catch (err) {
      console.log(err);
    }
  }

  getDAteString(item) {
    return new Date(item).toDateString();
  }
}
