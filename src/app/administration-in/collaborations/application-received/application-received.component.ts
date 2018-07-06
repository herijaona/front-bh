import { Component, OnInit } from '@angular/core';
import { Globals } from './../../../globals/globals';
import { ProjectsService } from '../../../services/projects/projects.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-application-received',
  templateUrl: './application-received.component.html',
  styleUrls: ['./application-received.component.scss'],
})
export class ApplicationReceivedComponent implements OnInit {
  public allApplData: any = [];
  hasData = false;
  readyData = false;
  constructor(private pr: ProjectsService, public g: Globals, private titl: Title) {
    this.titl.setTitle('All Received Application');
  }
  ngOnInit() {
    this.getAllCProjectApplication();
  }
  /**
   * getAllCProjectApplication
   */
  async getAllCProjectApplication() {
    this.allApplData = [];
    try {
      const appl: any = await this.pr.getCompanyApplication();
      if (appl.data) {
        this.allApplData = appl.data;
        if (this.allApplData.length > 0) {
          this.hasData = true;
        }
      }
      this.readyData = true;
    } catch (e) {
      console.log(e);
    }
  }
}
