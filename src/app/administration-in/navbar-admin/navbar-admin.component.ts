import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Globals } from './../../globals/globals';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';
import { SharedNotificationService } from '../../services/shared-notification/shared-notification.service';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { TeamsService } from '../../services/teams/teams.service';
@Component({
  selector: 'navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
})
export class NavbarAdminComponent implements OnInit {
  public team_page: string = 'team_page';
  public details: any;
  public img_avatar: string;
  public activated: boolean = false;
  public readyData: boolean = false;
  public userAdminData: any;
  public userCommData: any;

  public adminAll: boolean = true;
  public communityShow: boolean = false;

  public show: boolean = false;
  public hide: boolean = false;
  public currentSlug: string = '';
  public isOn: boolean = false;

  public st: any;
  constructor(
    private cs: CompanyService,
    private router: Router,
    public g: Globals,
    public el: ElementRef,
    public auth: AuthserviceService,
    private tms: TeamsService
  ) {
    this.getDataOnCompany();
  }

  async ngOnInit() {
    try {
      let isAdmin = await this.auth.isAdminUser();
      if (isAdmin['status'] === 'OK') {
        this.getProfile();
        this.getMember();
      } else {
        this.router.navigateByUrl('/');
      }
    } catch (e) {}
  }
  async getProfile() {
    try {
      let prdata: any = await this.auth.profile();
      if (prdata) {
        if (prdata.active) {
          this.activated = true;
          this.details = prdata;
          this.readyData = true;
          return prdata;
        } else {
          throw new Object({
            type: 'NotActivate',
          });
        }
      }
    } catch (ee) {
      this.readyData = true;
      if ('type' in ee) {
        if (ee.type == 'NotActivate') {
          this.activated = false;
        }
      } else {
        this.auth.logout();
      }
    }
  }
  async getMember() {
    try {
      let team_data: any = await this.tms.getTeamData();
      if (team_data) {
        this.userAdminData = team_data.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
  tif() {
    this.isOn = true;
  }
  toggleCollapse() {
    this.el.nativeElement.querySelector('.mobil-top').classList.toggle('toggle-in');
    this.el.nativeElement.querySelector('.mobil-top').classList.replace('nav-link', 'fy');
  }
  toggleCollapse2() {
    this.el.nativeElement.querySelector('.m-deconnect').classList.toggle('toggle-i');
  }

  async getDataOnCompany() {
    try {
      const isAdmin = await this.auth.isAdminUser();
      if (isAdmin['status'] === 'OK') {
        const getRes = await this.cs.getMyCompanData();
        if (getRes) {
          if (getRes.hasOwnProperty('_slug')) {
            this.currentSlug = getRes['_slug'];
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
