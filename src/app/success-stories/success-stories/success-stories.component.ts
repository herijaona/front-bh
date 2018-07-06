import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Globals } from './../../globals/globals';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss'],
})
export class SuccessStoriesComponent implements OnInit {
  public showDataState = false;
  public dataToSHow: any;
  public videoTeamPlay: any;
  public sstr_page = 'sStr_page';
  public currentCompanySlug: string;
  public modalStateCnt = false;
  public sstrAll: any = [];
  public SelectedSstr: any = {};
  public readySstrData = false;
  public toDoAction: string;
  public editAct = 'editAct';
  public newAct = 'newAct';

  public editPAGEstatus = false;
  @ViewChild('modalsstr') sstrModal: ModalDirective;
  @ViewChild('showVideoPlay') showModalPlay: ModalDirective;
  public contentEditState = false;
  constructor(
    public g: Globals,
    private cs: CompanyService,
    private sh: SharedNotificationService,
    private activRoute: ActivatedRoute
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_['slug_acc'];
      this.getDataSuccessStoryFront(this.currentCompanySlug);
    });

    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no === 'clck') {
        if (!st.state) {
          this.editPAGEstatus = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });
  }

  ngOnInit() {
    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case 'edit-new-sstr':
          if (st.action === 'close') {
            this.closemodalsstr();
          } else if (st.action === 'action') {
            if (st.data.type === 'success') {
              this.closemodalsstr();
            }
            if (st.data.refresh) {
              this.getDataSuccessStoryFront(this.currentCompanySlug);
            }
          }
          break;
        case 'add_new_event':
          this.addNewSstr();
          break;
        default:
          // code...
          break;
      }
    });
  }

  async getDataSuccessStoryFront(curr_slug) {
    this.sstrAll = [];
    try {
      const all: any = await this.cs.getAllSstr(curr_slug);
      if (all.data) {
        all.data.forEach(el => {
          el.im_poster = this.sh.getVideoImPoster(el.id_video);
          this.sstrAll.push(el);
        });
        this.readySstrData = true;
      } else {
        this.sstrAll = [];
        this.readySstrData = false;
      }
    } catch (e) {}
  }

  addNewSstr() {
    this.modalStateCnt = true;
    this.toDoAction = this.newAct;
    this.SelectedSstr = null;

    setTimeout(() => {
      this.sstrModal.show();
    }, 330);
  }

  closemodalsstr() {
    this.sstrModal.hide();
    setTimeout(() => {
      this.modalStateCnt = false;
      this.SelectedSstr = null;
    }, 330);
  }

  async deleteSstr(item) {
    try {
      const delRes: any = await this.cs.deleteSstr(item);
      if (delRes.status === 'OK') {
        this.readySstrData = false;
        this.sstrAll = [];
        this.getDataSuccessStoryFront(this.currentCompanySlug);
      }
    } catch (e) {
      console.log(e);
    }
  }
  editSstr(item) {
    this.modalStateCnt = true;
    this.toDoAction = this.editAct;
    this.SelectedSstr = item;

    setTimeout(() => {
      this.sstrModal.show();
    }, 330);
  }

  showTeamVideo(data) {
    this.showDataState = true;
    this.dataToSHow = data;
    this.videoTeamPlay = this.sh.getiframeVideo(data.id_video);
    setTimeout(() => {
      this.showModalPlay.show();
    }, 330);
  }
  showTeamVideoCLose() {
    this.showModalPlay.hide();
    setTimeout(() => {
      this.showDataState = false;
    }, 330);
  }

  hiddedModal() {
    setTimeout(() => {
      this.showDataState = false;
    }, 500);
  }
}
