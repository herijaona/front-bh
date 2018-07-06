import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals/globals';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';
import { Location } from '@angular/common';
@Component({
  selector: 'questions-details',
  templateUrl: './questions-details.component.html',
  styleUrls: ['./questions-details.component.scss'],
})
export class QuestionsDetailsComponent implements OnInit {
  public viewreaction_page = 'viewreaction_page';
  public questionsID: string;
  public responseForm: FormGroup;
  public responseData = '';
  public responseIN = [];
  public allQDet: any;
  public readytoshow = false;

  constructor(
    private location: Location,
    private sh: SharedNotificationService,
    private tms: TeamsService,
    private router: Router,
    private activRoute: ActivatedRoute,
    public g: Globals
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.questionsID = params_['qID'];
      this.getDetailsOnQuestions();
    });
    this.responseForm = new FormGroup({ respValue: new FormControl('', [Validators.required]) });
  }
  ngOnInit() {}

  async getDetailsOnQuestions() {
    try {
      const qDet: any = await this.tms.getDetailsOnQuestion(this.questionsID);
      if (qDet) {
        if (qDet.status === 'OK') {
          this.allQDet = qDet.data;
          this.readytoshow = true;
          this.responseIN = this.allQDet['responseIN'];
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  public closeAction() {
    window.close();
    this.location.back();
  }

  async saveResponse() {
    try {
      const dsend = {
        qID: this.allQDet._id,
        response_value: this.responseForm.value.respValue,
      };
      const respRes = await this.tms.sendResponseTOQuestions(dsend);
      if (respRes['status'] === 'OK') {
        // this.allQDet = respRes['data'];
        for (const respR of respRes['data']) {
          let eq = 0;
          for (const respI of this.responseIN) {
            if (respI._id === respR._id) {
              eq = 1;
              this.router.navigateByUrl('/' + ['administration-in', 'collaborations'].join('/'));
              break;
            }
          }
          if (eq === 0) {
            this.responseIN.push(respR);
          }
        }
        this.responseForm.reset({ respValue: '' });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async archivequestions() {
    try {
      const archResp = await this.tms.archiveQuestions(this.allQDet._id);
      if (archResp['status'] === 'OK') {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Questions successfully archived</p>',
        });
        this.router.navigateByUrl('/administration-in/desk/historical');
      }
    } catch (e) {
      console.log(e);
    }
  }

  timeStrng(i) {
    const tm = new Date(i);
    return tm.toDateString() + ' ' + tm.toTimeString().split(' ')[0];
  }
}
