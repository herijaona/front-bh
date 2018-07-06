import { Component, OnInit } from '@angular/core';
import { Globals } from './../../../globals/globals';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'app-application-by-collaboration',
  templateUrl: './application-by-collaboration.component.html',
  styleUrls: ['./application-by-collaboration.component.scss'],
})
export class ApplicationByCollaborationComponent implements OnInit {
  public allApplData: any = [];
  public dataCollab: any = {};
  hasData = false;
  readyData = false;
  private currentCollabID = '';
  constructor(private pr: ProjectsService, private activRoute: ActivatedRoute, public g: Globals) {}
  ngOnInit() {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCollabID = params_['idCollab'];
      if (this.currentCollabID) {
        this.getAllApplicationByCollab(this.currentCollabID);
      } else {
        console.log('Any Collaboration');
      }
    });
  }

  async getAllApplicationByCollab(cCollabID) {
    try {
      const applyByCollab = await this.pr.getApplByCollabID(cCollabID);
      if (applyByCollab['status'] === 'OK') {
        this.allApplData = applyByCollab['data']['allApplication'];
        this.dataCollab = applyByCollab['data']['collabData'];
        if (this.allApplData.length !== 0) {
          this.hasData = true;
        }
      }
      this.readyData = true;
    } catch (error) {
      console.log(error);
    }
  }
}
