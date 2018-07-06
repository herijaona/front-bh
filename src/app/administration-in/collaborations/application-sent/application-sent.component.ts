import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects/projects.service';
import { Globals } from './../../../globals/globals';

@Component({
  selector: 'app-application-sent',
  templateUrl: './application-sent.component.html',
  styleUrls: ['./application-sent.component.scss'],
})
export class ApplicationSentComponent implements OnInit {
  public allApplData: any = [];
  public hasData: boolean;
  constructor(private pr: ProjectsService, public g: Globals) {}

  ngOnInit() {
    this.getAllCApplicationSent();
  }
  async getAllCApplicationSent() {
    this.allApplData = [];
    try {
      const appl: any = await this.pr.getUserApplicationSent();
      if (appl.status === 'OK') {
        this.allApplData = appl.data;
        this.hasData = this.allApplData.length > 0 ? true : false;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
