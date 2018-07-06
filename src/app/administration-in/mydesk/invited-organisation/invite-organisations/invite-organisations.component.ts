
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Globals } from '../../../../globals/globals';
import { SharedNotificationService } from '../../../../services/shared-notification/shared-notification.service';
import { AuthserviceService } from '../../../../services/authservice/authservice.service';
import { TeamsService } from '../../../../services/teams/teams.service';

@Component({
  selector: 'app-invite-organisations',
  templateUrl: './invite-organisations.component.html',
  styleUrls: ['./invite-organisations.component.scss']
})
export class InviteOrganisationsComponent implements OnInit {
  public inviteForm: FormGroup;
  public itemrow: any;
  public invitationResult = [];
  public showResult = false;
  public hasError = false;
  constructor(private _fb: FormBuilder, private tms: TeamsService) { }

  ngOnInit() {
    this.inviteForm = this._fb.group({
      inviteItem: this._fb.array([this.initItemRows()]),
    });
  }
  initItemRows() {
    return this._fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      organisationName: new FormControl('', [Validators.required]),
      invitation_email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), Validators.required]),
    });
  }

  addNewRow() {
    const control = <FormArray>this.inviteForm.controls['inviteItem'];
    control.push(this.initItemRows());
  }
  deleteRow(index: number) {
    const control = <FormArray>this.inviteForm.controls['inviteItem'];
    control.removeAt(index);
  }
  getcontrols() {
    return this.inviteForm.controls.inviteItem['controls'];
  }

  async sendInvitation() {
    if (!this.inviteForm.valid) {
      return;
    }
    const argDATA = {
      org_data: this.inviteForm.value.inviteItem,
    };
    try {
      const invitRes = await this.tms.sendOrgnisationInvitation(argDATA);
      if (invitRes['status'] === 'OK') {
        this.invitationResult = invitRes['data'];
        const er = this.invitationResult.filter((el) => {
          if (el.res_value.value === 'NOK') { return true; }
        });
        this.hasError = er.length > 0;
        this.showResult = true;
        this.formReset();
        setTimeout(() => {
          this.showResult = false;
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * formReset
   */
  public formReset() {
    const l = this.inviteForm.value.inviteItem.length;
    for (let index = l - 1; index > 0; index--) {
      this.deleteRow(index);
    }
    this.inviteForm.reset();
  }
}
