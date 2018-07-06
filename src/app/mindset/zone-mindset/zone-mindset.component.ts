import { Component, OnInit, ViewChild, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { Globals } from './../../globals/globals';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { ModalDirective } from 'angular-bootstrap-md';
declare var Masonry: any;
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'zone-mindset',
  templateUrl: './zone-mindset.component.html',
  styleUrls: ['./zone-mindset.component.scss'],
})
export class ZoneMindsetComponent implements OnInit, OnDestroy {
  public stZone = false;
  public currentCompanySlug = '';
  public editPAGEstatus = false;
  private myWindth: number;
  @ViewChild('form') myModal: ModalDirective;
  @ViewChild('ggrd') grid_: ElementRef;
  public zoneEditState = false;
  public addNewState = false;
  public dataZoneEdit: any;
  public existDtype: any;
  public zoneActionType: string;
  public mdl_title = '';
  public allZ: any;
  public allZ1: any;
  private subscr: {
    [key: string]: Subscription;
  } = {};
  public chrDtype: any;
  public oneCol: number;
  public masonry_option: { [key: string]: any } = {
    columnWidth: '.normal',
    itemSelector: '.masonry-item',
    fitWidth: false,
    horizontalOrder: true,
    initLayout: true,
    gutter: 2,
    originTop: true,
    originLeft: true,
    // percentPosition: true
  };
  public twoCol: number;
  constructor(
    public g: Globals,
    private activRoute: ActivatedRoute,
    private auth: AuthserviceService,
    private sh: SharedNotificationService,
    private cs: CompanyService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.subscr.prm = this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_['slug_acc'];
      this.formatDataView();
    });

    this.subscr.ntb = this.sh.notifButton$.subscribe((st: any) => {
      if (st.no === 'clck') {
        if (!st.state) {
          this.editPAGEstatus = false;
          this.zoneEditState = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });

    this.subscr.bus = this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case 'modal_new':
          if (st.data === 'end') {
            this.closeModalAddNEw();
            this.formatDataView();
          }
          break;
        case 'editZone':
          this.EditZone(st.data);
          break;
        case 'deleteZone':
          this.formatDataView();
          break;
        case 'add_new_event':
          this.AddNew();
          break;
        default:
          // code...
          break;
      }
    });
  }

  async formatDataView() {
    try {
      this.stZone = false;
      this.allZ = [];
      let dtype = [];
      let all: any = await this.cs.allZoneData(this.currentCompanySlug);
      if (all) {
        let chrDtype: any;
        for (let z in all) {
          dtype.push(all[z].dtype);
          switch (all[z].dtype) {
            case 3:
              this.chrDtype = all[z];
              all.splice(z, 1);
              break;
            default:
              if ('rang' in all[z]) {
              }
              break;
          }
        }
        if (!dtype.includes(3)) {
          this.chrDtype = null;
        }
        dtype = dtype.filter((elem, pos, arr) => {
          return arr.indexOf(elem) == pos;
        });
        this.allZ1 = all[0];
        all.splice(0, 1);
        this.existDtype = dtype;
        this.allZ = all;
        this.stZone = true;
      }
    } catch (e) {}
  }

  AddNew() {
    this.addNewState = true;
    this.zoneActionType = 'addNew';
    this.dataZoneEdit = null;
    setTimeout(() => {
      this.myModal.show();
    }, 400);
  }

  EditZone(znData) {
    if (znData.dtype == 1) {
      this.mdl_title = 'Edit Mindset Image';
    } else if (znData.dtype == 2) {
      this.mdl_title = 'Edit Mindset Video';
    } else if (znData.dtype == 3) {
      this.mdl_title = 'Numbers';
    }
    this.addNewState = true;
    this.zoneActionType = 'editZone';
    this.dataZoneEdit = znData;
    setTimeout(() => {
      this.myModal.show();
    }, 400);
  }

  closeModalAddNEw() {
    this.myModal.hide();
  }

  hiddedModal() {
    if (this.addNewState) {
      this.addNewState = false;
    }
    if (this.zoneActionType) {
      this.zoneActionType = '';
    }
    if (this.dataZoneEdit) {
      this.dataZoneEdit = null;
    }
    if (this.mdl_title) {
      this.mdl_title = '';
    }
  }

  ngAfterViewInit() {}
  ngOnDestroy() {
    Object.keys(this.subscr).forEach(e => {
      this.subscr[e].unsubscribe();
    });
  }
}
