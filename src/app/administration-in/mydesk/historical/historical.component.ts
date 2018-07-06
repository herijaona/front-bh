import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../../globals/globals';
import { TeamsService } from '../../../services/teams/teams.service';
import { ProjectsService } from '../../../services/projects/projects.service';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent implements OnInit {
  constructor(private tms: TeamsService, public g: Globals, public pr: ProjectsService) {}
  public allQuestions: any = [];
  ngOnInit() {
    this.getAllarchives();
    this.getArchivedApplication();
  }

  async getAllarchives() {
    this.allQuestions = [];
    try {
      const quest: any = await this.tms.getAllArchivesOnCompany('no-project');
      if (quest) {
        if (quest.status === 'OK') {
          this.allQuestions = quest.data;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  getDateString(arg) {
    const a = new Date(arg).toDateString();
    return a;
  }

  public async getArchivedApplication() {
    try {
      const hRefused = await this.pr.refusedApplication();
      if (hRefused['status'] === 'OK') {
        console.log(hRefused['data']);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
