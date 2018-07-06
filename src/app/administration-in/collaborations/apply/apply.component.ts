import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from './../../../globals/globals';
import { SharedNotificationService } from './../../../services/shared-notification/shared-notification.service';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { ProjectsService } from '../../../services/projects/projects.service';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit {
  public project_id: string;
  public dataForApplication: any = {};
  public typeOfCollab: { [key: string]: any } = {
    type1: false,
    type2: false,
    type3: false,
    type4: false,
  };
  constructor(
    public g: Globals,
    public sh: SharedNotificationService,
    public activRoute: ActivatedRoute,
    private auth: AuthserviceService,
    private pr: ProjectsService
  ) {}

  async getProjects() {
    let dataApplyResponse: any = await this.pr.getDataforApply(this.project_id);
    if (dataApplyResponse.status === 'OK') {
      this.dataForApplication = dataApplyResponse.data;
      let typeC = this.dataForApplication.typeSelect;
      this.typeOfCollab[typeC] = true;
    }
  }

  ngOnInit() {
    this.activRoute.params.subscribe((params_: any) => {
      this.project_id = params_['id_project'];
      if (this.project_id) {
        this.getProjects();
      }
    });
  }
}
