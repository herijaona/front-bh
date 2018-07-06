import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss'],
})
export class GeneralConfigComponent implements OnInit {
  public pageConfig = {};
  constructor(private cs: CompanyService, private sh: SharedNotificationService) {}

  ngOnInit() {
    this.getCompanyDetails();
  }
  async getCompanyDetails() {
    try {
      const cmpDetails = await this.cs.getMyCompanData();
      console.log(cmpDetails);
      if (cmpDetails) {
        this.pageConfig = JSON.parse(cmpDetails['pagetoShow']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  verifyST(pge) {
    const d = Object.keys(this.pageConfig);
    for (const it of d) {
      if (pge === it) {
        return this.pageConfig[it];
      }
    }
    return false;
  }

  changePageData(ev, page) {
    console.log(ev.target.checked);
    this.pageConfig[page] = ev.target.checked;
  }

  async saveDataConfig() {
    try {
      let res = await this.cs.updatePagetoShow(this.pageConfig);
      if (res['status']) {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Configuration successfully saved</p>',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  readOnlyFn() {
    return false;
  }
}
