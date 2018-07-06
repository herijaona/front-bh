import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';

@Component({
  selector: 'edit-page-button',
  templateUrl: './edit-page-button.component.html',
  styleUrls: ['./edit-page-button.component.scss'],
})
export class EditPageButtonComponent implements OnInit, OnDestroy {
  public button_text: string = 'Edit';
  public edit_state: boolean = false;
  public isAdmin: boolean = false;
  public isComm: boolean = false;
  public currAccId: string;
  public currentCompanySlug: string = '';

  constructor(
    private activRoute: ActivatedRoute,
    private cs: CompanyService,
    private auth: AuthserviceService,
    private sh: SharedNotificationService
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_['slug_acc'];
      this.isAdm();
    });
  }

  ngOnInit() {}

  isAdm() {
    this.auth.isAdmin(this.currentCompanySlug).then((er: any) => {
      this.isAdmin = er.resp;
      console.log(er);
      if (!er.resp) {
        if ('isComm' in er) {
          if (er['isComm']) {
            this.isComm = true;
            this.currAccId = er.data;
          }
        } else {
          this.sh.setLocalEditState(0);
          this.sh.pageEditButton({ state: false, no: 'clck' });
        }
      } else {
        this.currAccId = er.data;
      }
    });
  }

  show_hideAllEdit() {
    if (this.edit_state) {
      this.sh.pushData({
        from: 'editKeyGeneral',
        action: 'idACCOUNT',
        data: '',
      });
      this.sh.setLocalEditState(0);
      this.edit_state = false;
      this.button_text = 'Edit';
      this.sh.pageEditButton({ state: false, no: 'clck' });
    } else {
      this.sh.pushData({
        from: 'editKeyGeneral',
        action: 'idACCOUNT',
        data: this.currAccId,
      });
      this.sh.setLocalEditState(1);
      this.edit_state = true;
      this.button_text = 'Leave Edit';
      this.sh.pageEditButton({ state: true, no: 'clck' });
    }
  }

  ngOnDestroy() {
    this.cs.removeMycompanyId();
    this.sh.pageEditButton({});
    this.sh.pushData({});
  }

  show_hideCommEdit() {
    if (this.edit_state) {
      this.sh.pushData({
        from: 'editKeyGeneral',
        action: 'idACCOUNT',
        data: '',
      });
      this.edit_state = false;
      this.button_text = 'Edit';
      this.sh.pushData({
        from: 'commEditpage',
        message: 'stateChange',
        data: false,
      });
    } else {
      this.sh.pushData({
        from: 'editKeyGeneral',
        action: 'idACCOUNT',
        data: this.currAccId,
      });

      this.edit_state = true;
      this.button_text = 'Leave Edit';
      this.sh.pushData({
        from: 'commEditpage',
        message: 'stateChange',
        data: true,
      });
    }
  }
  addNewEvent(event) {
    this.sh.pushData({
      from: 'add_new_event',
      message: 'kfid',
      data: true,
    });
  }
}
