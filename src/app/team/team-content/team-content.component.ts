import { Directive, Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Globals } from './../../globals/globals';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'angular-bootstrap-md';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'team-content',
  templateUrl: './team-content.component.html',
  styleUrls: ['./team-content.component.scss'],
})
export class TeamContentComponent implements OnInit {
  public currentCompanySlug: string;
  public editPAGEstatus: boolean = false;
  public contentEditState: boolean = false;
  public addNewState: boolean = false;
  public showDataState: boolean = false;
  @ViewChild('form') myModal: ModalDirective;
  @ViewChild('showVideo') showModal: ModalDirective;
  public dataTeamFront: any = [];
  public tmVideoAction: string;
  private editAct: string = 'tmVEdit';
  private AddAct: string = 'tmVAdd';
  public tmVideoData: any;
  public dataToSHow: any;
  public videoTeam: any;

  constructor(
    public el: ElementRef,
    public g: Globals,
    public sh: SharedNotificationService,
    private activRoute: ActivatedRoute,
    private cs: CompanyService,
    private tms: TeamsService,
    private router: Router
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_['slug_acc'];
      this.getDataTeamFront(this.currentCompanySlug);
    });

    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no === 'clck') {
        if (!st.state) {
          this.editPAGEstatus = false;
          this.contentEditState = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });

    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case 'tmodal_new':
          if (st.data === 'end') {
            this.closeModalAddNEw();
            this.getDataTeamFront(this.currentCompanySlug);
          }
          break;
        case 'tmVideoFront':
          if (st.action === 'refresh') {
            this.getDataTeamFront(this.currentCompanySlug);
          } else if (st.action === 'edit') {
            this.editTmVideo(st.data);
          } else if (st.action === 'show') {
            this.showTeamVideo(st.data['data']);
          }
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

  showTeamVideo(data) {
    this.showDataState = true;
    this.dataToSHow = data;
    this.videoTeam = data.iframe_;
    setTimeout(() => {
      this.showModal.show();
    }, 330);
  }

  ngOnInit() {}

  AddNew() {
    this.addNewState = true;
    this.tmVideoAction = this.AddAct;
    this.tmVideoData = null;
    setTimeout(() => {
      this.myModal.show();
    }, 300);
  }

  editTmVideo(data) {
    this.addNewState = true;
    this.tmVideoAction = this.editAct;
    this.tmVideoData = data;
    setTimeout(() => {
      this.myModal.show();
    }, 300);
  }

  async getDataTeamFront(sl_) {
    try {
      let allData = await this.tms.teamFrontGetData(this.currentCompanySlug);
      if (allData) {
        if (allData['status'] === 200) {
          this.dataTeamFront = allData['videoTeam'];
        }
      }
    } catch (e) {}
  }

  closeModalAddNEw() {
    this.myModal.hide();
  }

  showVideoCLose() {
    this.showModal.hide();
  }

  hiddedModalAddEdit() {
    setTimeout(() => {
      this.addNewState = false;
      this.tmVideoAction = '';
      this.tmVideoData = null;
    }, 500);
  }

  hiddedModal() {
    setTimeout(() => {
      this.showDataState = false;
    }, 500);
  }
}
