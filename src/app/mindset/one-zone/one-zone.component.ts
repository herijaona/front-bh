import { Component, OnInit, Input, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Globals } from './../../globals/globals';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { CompanyService } from '../../services/company/company.service';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';

@Component({
  selector: 'one-zone',
  templateUrl: './one-zone.component.html',
  styleUrls: ['./one-zone.component.scss'],
})
export class OneZoneComponent implements OnInit, OnDestroy {
  public showDataState: boolean = false;
  private canDeleted: boolean;
  public addNewState: boolean = false;

  public editPAGEstatus: boolean = false;
  public oneZoneEditState: boolean = false;
  public zone_type: string = 'image';
  public dtZone: { [key: string]: any };

  @Input('dataZone')
  set dataZone(d) {
    this.dtZone = d;
  }
  public in_col: number;
  public sm_col: number;
  constructor(
    public g: Globals,
    private el: ElementRef,
    private auth: AuthserviceService,
    private sh: SharedNotificationService,
    private cs: CompanyService
  ) {
    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no == 'clck') {
        if (!st.state) {
          this.editPAGEstatus = false;
          this.oneZoneEditState = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });
  }

  ngOnInit() {
    this.canDeleted = this.dtZone.canDeleted;
    if (this.dtZone.dtype === 2) {
      if (!this.dtZone.video.url.startsWith('uploads')) {
        this.dtZone.video.url = JSON.parse(this.dtZone.video.url);
      }
    } else if (this.dtZone.dtype === 3) {
      this.dtZone.data_suppl = JSON.parse(this.dtZone.data_suppl);
    }
  }

  async deleteZone() {
    try {
      let resDel = await this.cs.deleteZone(this.dtZone._id);
      if (resDel) {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Configuration saved</p>',
        });
        this.sh.pushData({
          from: 'deleteZone',
          action: 'notif',
          data: 'success',
        });
      }
    } catch (e) {}
  }

  editZone() {
    this.sh.pushData({ from: 'editZone', data: this.dtZone });
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }

  ShowZoom() {
    this.sh.pushData({
      from: 'showZoom',
      action: 'one-zone',
      data: this.dtZone,
    });
  }

  getPoster() {
    return this.sh.getVideoImPoster(this.dtZone.video.url.i_v);
  }

  getCurrency(cr) {
    return cr != 'default' ? cr.split('|')[0] : '--';
  }
}
