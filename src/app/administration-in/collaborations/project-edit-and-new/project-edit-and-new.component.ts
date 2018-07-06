import { Component, OnInit, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../../services/projects/projects.service';
import { SharedNotificationService } from './../../../services/shared-notification/shared-notification.service';
import { Globals } from './../../../globals/globals';
import { Router, ActivatedRoute } from '@angular/router';

declare const CKEDITOR: any;

@Component({
  selector: 'project-edit-and-new',
  templateUrl: './project-edit-and-new.component.html',
  styleUrls: ['./project-edit-and-new.component.scss'],
})
export class ProjectEditAndNewComponent implements OnInit, OnDestroy {
  public editAct: string = 'EditAct';
  public addAct: string = 'AddAct';
  public todoAct: string;
  public accId: any;
  public selctCollab: string;
  public prData: any;
  public collabTypes: any = [];
  public slugCollabType: string = '';
  @Input('todoAct_')
  set todoAct_(arg) {
    this.todoAct = arg;
  }
  @Input('prData_')
  set prData_(arg) {
    this.prData = arg;
  }

  constructor(
    public g: Globals,
    private pr: ProjectsService,
    private sh: SharedNotificationService,
    private el: ElementRef,
    private activRoute: ActivatedRoute
  ) {
    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case 'editKeyGeneral':
          this.accId = st.data;
      }
    });

    this.activRoute.params.subscribe((params_: any) => {
      this.slugCollabType = params_['item-slug'];
    });
  }
  ngOnInit() {
    if (this.todoAct === this.editAct) {
    }
    this.getAllCollabT();
  }

  async getAllCollabT() {
    try {
      let allCT: any = await this.pr.getAllCollabTpes();
      if (allCT) {
        if (allCT.status === 'OK') {
          this.collabTypes = allCT.data;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  selectTypeCollab() {
  }

  ngOnDestroy() {}
}
