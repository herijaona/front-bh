import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public viewreaction_page = 'viewreaction_page';
  public allQuestions: any = [];
  public readyData = false;
  public hasData = false;
  public dataL = [];
  constructor(private tms: TeamsService, private titl: Title) {}

  ngOnInit() {
    this.getAllQuestions();
    this.getAskedQUestions();
    this.titl.setTitle('Questions Report');
  }
  async getAskedQUestions() {
    this.dataL = [];
    try {
      const rDAta = await this.tms.getaskedQQ({ qREF: 'PRT' });
      if (rDAta['status'] === 'OK') {
        console.log(rDAta);
        this.dataL = rDAta['data'];
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllQuestions() {
    this.allQuestions = [];
    try {
      const quest: any = await this.tms.getAllQuestionsOnCompany('project');
      if (quest) {
        if (quest.status === 'OK') {
          this.allQuestions = quest.data;
          if (this.allQuestions.length > 0) {
            this.hasData = true;
          }
          this.readyData = true;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
