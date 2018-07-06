import { Component, OnInit, OnDestroy } from '@angular/core';
import { Globals } from './../../globals/globals';
import { ProjectsService } from '../../services/projects/projects.service';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public currentCompanySlug: string;
  public editPAGEstatus: boolean = false;
  public listData: any;
  constructor(
    public g: Globals,
    private activRoute: ActivatedRoute,
    private sh: SharedNotificationService,
    private pr: ProjectsService
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_['slug_acc'];
      this.formatDataView();
    });

    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no == 'clck') {
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
        case 'projectNEW':
          if (st.action == 'refresh') {
            this.formatDataView();
          }
          break;
        case 'commEditpage':
          this.editStateChange(st.data);
          break;
        default:
          break;
      }
    });
  }

  editStateChange(st) {
    if (!st) {
      this.editPAGEstatus = false;
    } else {
      this.editPAGEstatus = true;
    }
  }

  async formatDataView() {
    let allProject: any = [];
    this.listData = [];
    try {
      allProject = await this.pr.getCompanyProject(this.currentCompanySlug);
      if (allProject.status === 'OK') {
        if (allProject.status === 'OK') {
          this.listData = allProject.data;
          for (let xe in this.listData) {
            let cnt: string = this.listData[xe].contexte.replace(/\n/g, '').replace(/<(?:.|\n)*?>/gm, '');
            if (cnt.length > 300) {
              cnt = cnt.substr(0, 300) + '....';
            }
            this.listData[xe].contexte = cnt;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  editProject(item) {
    this.sh.pushData({
      from: 'editProject',
      action: 'edit',
      data: item,
    });
  }

  async deleteProject(item) {
    try {
      let resDel = await this.pr.deleteProject(item);
      if (resDel) {
        this.formatDataView();
      }
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }

  trackByFn(index, item) {
    return item._id; // or item.id
  }
}
