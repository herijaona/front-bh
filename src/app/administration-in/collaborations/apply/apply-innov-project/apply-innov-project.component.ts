import { Component, OnInit, Input } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { SharedNotificationService } from './../../../../services/shared-notification/shared-notification.service';
import { Globals } from './../../../../globals/globals';

@Component({
  selector: 'apply-innov-project',
  templateUrl: './apply-innov-project.component.html',
  styleUrls: ['./apply-innov-project.component.scss'],
})
export class ApplyInnovProjectComponent implements OnInit {
  public prObjApply: any;
  public UserOrgName: any;
  public canBeSent= false;
  public applyToForm: FormGroup;

  @Input('data_in')
  set data_in(o) {
    this.prObjApply = o;
  }

  constructor(
    public g: Globals,
    private router: Router,
    private pr: ProjectsService,
    private sh: SharedNotificationService
  ) {
    this.applyToForm = new FormGroup({
      main_activity_domain: new FormControl('', [Validators.required]),
      secondary_activity_domain: new FormControl('', [Validators.required]),
      skill_specificities: new FormControl('', [Validators.required]),
      collab_proposal_describ: new FormControl('', [Validators.required]),
      applicationName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.prObjApply['hasAcc']) {
      /* the default */
      this.UserOrgName = this.prObjApply['userACC'][0].enseigneCommerciale;
    } else {
      this.UserOrgName = this.prObjApply['userACC']['enseigneCommerciale'];
    }
  }

  async sendApplicationOnProject() {
    if (this.applyToForm.valid) {
      // this.projectApplyData['countryCD'] = this.modelCountry;
      let candidatAccID = '';
      const roleData = JSON.parse(localStorage.getItem('_data_role_'));
      if (roleData) {
        if (roleData.hsAc) {
          candidatAccID = roleData.admDefl;
        }
      }
      const arg = {
        data: this.applyToForm.value,
        currObj: this.prObjApply,
        candidatAccID: candidatAccID,
      };
      try {
        const ret: any = await this.pr.sendProjectsApplication(arg);

        if (ret.status === 'OK') {
          this.sh.notifToast({
            type: 'success',
            message: '<p>Application sent</p>',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/' + ['administration-in', 'collaborations', 'application-sent'].join('/'));
          }, 500);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  onChange(t) {}
  onReady($event) {}
  onEditorChange($event) {}
}
