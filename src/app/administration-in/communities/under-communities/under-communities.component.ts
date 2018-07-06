import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../../services/teams/teams.service';
import { SharedNotificationService } from '../../../services/shared-notification/shared-notification.service';

@Component({
  selector: 'app-under-communities',
  templateUrl: './under-communities.component.html',
  styleUrls: ['./under-communities.component.scss'],
})
export class UnderCommunitiesComponent implements OnInit {
  public allcommDataList = [];
  public currcommDataList = [];
  public pageNum = [];
  showPagination = false;
  currPage = 1;
  constructor(private tms: TeamsService, private sh: SharedNotificationService) {}

  reactOnNewCommData() {
    this.getCommDataList();
  }

  ngOnInit() {
    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case 'addedNewCommData':
          this.reactOnNewCommData();
          break;
      }
    });
    this.getCommDataList();
  }

  async getCommDataList() {
    try {
      const dataList = await this.tms.getCommunitiesDataList();
      if (dataList['status'] === 'OK') {
        this.allcommDataList = dataList['data'];
        if (this.allcommDataList.length > 100) {
          const nn = Math.floor(this.allcommDataList.length / 100) + 1;
          this.pageNum = Array(nn).map((x, i) => i + 1);
          this.currcommDataList = this.allcommDataList.slice(0, 99);
          this.showPagination = true;
        } else {
          this.currcommDataList = this.allcommDataList;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
