import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects/projects.service';
import { SharedNotificationService } from './../../../services/shared-notification/shared-notification.service';
import { Globals } from './../../../globals/globals';
@Component({
  selector: 'app-admin-all-colab',
  templateUrl: './admin-all-colab.component.html',
  styleUrls: ['./admin-all-colab.component.scss'],
})
export class AdminAllColabComponent implements OnInit {
  public listCollab: any = [];
  public hasData = false;
  public readyData = false;
  public withcolab: any = [];
  constructor(
    public g: Globals,
    private pr: ProjectsService,
    private sh: SharedNotificationService,
    private titl: Title
  ) {
    this.titl.setTitle('My Collaborations');
  }
  ngOnInit() {
    this.getMyCollabList();
    this.getICollaborWith();
  }
  async getMyCollabList() {
    try {
      const allCollabResp: any = await this.pr.getAllMyCollabList();
      if (allCollabResp['status'] === 'OK') {
        this.listCollab = allCollabResp['data'];
        if (this.listCollab.length > 0) {
          this.hasData = true;
        }
        this.readyData = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getICollaborWith() {
    try {
      const li = await this.pr.getMyCollaborWith();
      if (li['status'] === 'OK') {
        this.withcolab = li['data'];
      }
    } catch (e) {
      console.log(e);
    }
  }
}
