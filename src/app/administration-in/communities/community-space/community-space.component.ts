import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Globals } from '../../../globals/globals';
import { TeamsService } from '../../../services/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';
@Component({
  selector: 'app-community-space',
  templateUrl: './community-space.component.html',
  styleUrls: ['./community-space.component.scss'],
})
export class CommunitySpaceComponent implements OnInit {
  public newSubjectForm: FormGroup;
  allSubjetcs = [];
  public commDETAILS = {};
  public img_avatar: string;
  public currCOMMID = '';
  public slctSubject = {};
  @ViewChild('modalSet') public myModalHist: ModalDirective;
  constructor(
    public activRoute: ActivatedRoute,
    public g: Globals,
    private tms: TeamsService,
    public sh: SharedNotificationService
  ) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }

  ngOnInit() {
    this.activRoute.params.subscribe((params_: any) => {
      this.currCOMMID = params_['commID'];
      if (this.currCOMMID) {
        this.getSubjectsList();
        this.getCommDetails();
      }
    });
    this.newSubjectForm = new FormGroup({
      subjectName: new FormControl('', [Validators.required]),
      subjectContent: new FormControl('', [Validators.required]),
    });
  }

  async getSubjectsList() {
    try {
      const rs = await this.tms.getCOMMSUbjectsList({ commID: this.currCOMMID });
      if (rs['status'] === 'OK') {
        this.allSubjetcs = rs['data'];
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getCommDetails() {
    try {
      let dtl = await this.tms.getCommDetailsData({ commID: this.currCOMMID });
      if (dtl['status'] === 'OK') {
        this.commDETAILS = dtl['data'];
      }
    } catch (e) {}
  }

  public showModal() {
    this.newSubjectForm.reset();
    setTimeout(() => {
      this.myModalHist.show();
    }, 1500);
  }

  onChange(event) {}
  onEditorChange(event) {}
  onReady(event) {}

  async saveAndSendSubject() {
    if (!this.newSubjectForm.valid) {
      return;
    }
    const saveRes = await this.tms.saveNewSubjectCommunity({
      name: this.newSubjectForm.value.subjectName,
      subject: this.newSubjectForm.value.subjectContent,
      communitiesID: this.currCOMMID,
    });
    if (saveRes['status'] === 'OK') {
      this.sh.notifToast({
        type: 'success',
        message: '<p> Created SuccessFully</p>',
      });
      this.myModalHist.hide();
      this.getSubjectsList();
    }
  }
  icheckChange() {
    return true;
  }

  getDateText(i) {
    return new Date(i).toDateString();
  }
  readyData(obj) {
    return 'name' in obj;
  }

  selectSubjects(it) {
    this.slctSubject = it;
  }
}
