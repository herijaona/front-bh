import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../services/authservice/authservice.service';
import { DealSpaceService } from '../../../../services/deal-space/deal-space.service';
import { Globals } from '../../../../globals/globals';
@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss'],
})
export class DealListComponent implements OnInit {
  public listDeal: any;

  constructor(private auth: AuthserviceService, private dealService: DealSpaceService,public g: Globals) {}

  ngOnInit() {
    this.getListDealSpace();
  }

  async getListDealSpace() {
    try {
      let list: any = await this.dealService.getDealSpaceList();
      if (list.status === 'OK') {
        this.listDeal = list.data;
      } else alert('Error when getting deal space list');
    } catch (ex) {
      console.log(ex);
    }
  }
}
