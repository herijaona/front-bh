import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Globals } from './../../globals/globals';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../services/teams/teams.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { SharedNotificationService } from '../../services/shared-notification/shared-notification.service';
@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit, OnDestroy {
  public img_a: string;
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  public newCommForm: FormGroup;
  constructor(public g: Globals, private tms: TeamsService, private sh: SharedNotificationService,public el: ElementRef) {}
  ngOnInit() {
    this.newCommForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  public showMod() {
    setTimeout(() => {
      this.myModalHist.show();
    }, 330);
  }
  public hideModal() {
    setTimeout(() => {
      this.myModalHist.hide();
    }, 330);
  }

  async onSubmitNewCommunities() {
    if (this.newCommForm.valid) {
      try {
        const addNewREs = await this.tms.addNewCommunities(this.newCommForm.value);
        if (addNewREs['status'] === 'OK') {
          this.newCommForm.reset();
          this.sh.notifToast({
            type: 'success',
            message: '<p> Created SuccessFully</p>',
          });
          this.notifChange();
          this.hideModal();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  notifChange() {
    this.sh.pushData({
      from: 'addedNewCommData',
      action: 'refresh',
    });
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }
  toggleCollapse2() {
		this.el.nativeElement.querySelector('.ns').classList.toggle('ln');
		this.el.nativeElement.querySelector('.float-r').classList.toggle('ln');
	  }
}
