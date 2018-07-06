import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from './../../../globals/globals';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ProjectsService } from '../../../services/projects/projects.service';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  public applicationreport_page = 'applicationreport_page';
  public currentCandidatureID = '';
  public readytoshow = false;
  public detailsAll: any = {};
  constructor(
    private router: Router,
    private pr: ProjectsService,
    private activRoute: ActivatedRoute,
    private sh: SharedNotificationService,
    private titl: Title,
    public g: Globals
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCandidatureID = params_['applicationID'];
      this.getDetailsOnCandidature();
    });
  }

  ngOnInit() {
    this.titl.setTitle('Applications details');
  }
  async getDetailsOnCandidature() {
    this.detailsAll = [];
    try {
      const cDetails: any = await this.pr.getDetails(this.currentCandidatureID);
      if (cDetails) {
        if (cDetails.status === 'OK') {
          this.detailsAll = cDetails.data;
          this.readytoshow = true;
        } else {
          // code...
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async acceptApplication() {
    try {
      const acceptResData = await this.pr.sendacceptApplicationData({ applicationID: this.currentCandidatureID });
      if (acceptResData['status'] === 'OK') {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Application save</p>',
        });
        this.router.navigateByUrl('/administration-in/collaborations/deal-space/list');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async refusedpplication() {
    try {
      const refusResData = await this.pr.sendRefuseApplicationData({ applicationID: this.currentCandidatureID });
      if (refusResData['status'] === 'OK') {
        this.sh.notifToast({ type: 'success', message: '<p>Application save</p>' });
        this.router.navigateByUrl('/administration-in/collaborations/application-received');
      }
    } catch (err) {
      console.log(err);
    }
  }

  closeAction() {
    window.close();
  }
}
