import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { UserDetails } from '../../models/user-detail.model';
import { Globals } from './../../globals/globals';
import { BaseHttpService } from '../base-http/base-http.service';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';

import { CompanyService } from '../company/company.service';

interface TokenResponse {
  token: string;
}

@Injectable()
export class AuthserviceService extends BaseHttpService {
  private token: string;

  constructor(
    public http: HttpClient,
    public g: Globals,
    private router: Router,
    public sh: SharedNotificationService,
    private cs: CompanyService
  ) {
    super(http, g, sh);
  }

  public saveUser(user: UserDetails): void {
    localStorage.setItem('bh-user', JSON.stringify(user));
  }

  public getUser(): any {
    const u = localStorage.getItem('bh-user');
    if (u) {
      return JSON.parse(u);
    } else {
      return null;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('bh-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('bh-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public isAdmin(curr_slug) {
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn()) {
        const u = this.getUser();
        if (u) {
          this.fetch('get', 'check_role', { slug_chk: curr_slug })
            .toPromise()
            .then(
              (re: any) => {
                const rs = {
                  resp: re.data_check_response,
                };

                if ('_id_check' in re) {
                  rs['data'] = re._id_check;
                } else {
                  rs['data'] = null;
                }
                if ('data_isComm' in re) {
                  rs['isComm'] = re.data_isComm;
                } else {
                  rs['isComm'] = false;
                }
                resolve(rs);
              },
              err => {
                reject(err.error);
              }
            );
        } else {
          resolve({ resp: false });
        }
      } else {
        resolve({ resp: false });
      }
    });
  }

  async isAdminUserV2() {
    try {
      const roleObj = JSON.parse(localStorage.getItem(Globals.localStorageString.DATAROLE));
    } catch (e) {
      console.log(e);
    }
  }

  getXCompanyID(): string {
    const _roleData = JSON.parse(localStorage.getItem(Globals.localStorageString.DATAROLE));
    if (_roleData) {
      if ('admDefl' in _roleData) {
        if (_roleData['admDefl']) {
          return _roleData['admDefl'];
        }
      }
    }
    return '';
  }

  async isAdminUser() {
    const cID = this.getXCompanyID();
    if (!cID) {
      return Promise.resolve({ status: 'NOK' });
    }
    try {
      return this.fetch('get', 'Admincheck_role', { idCompany: cID }).toPromise();
    } catch (er) {
      return Promise.resolve({ status: 'NOK' });
    }
  }

  public register(user: any): Observable<any> {
    return this.fetch('post', 'register', user);
  }

  public login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetch('post', 'login', user)
        .toPromise()
        .then(
          (d: any) => {
            if (d.token) {
              this.saveToken(d.token);
              this.userDataRole();
            }
            resolve(d);
          },
          err => {
            reject(err.error);
          }
        );
    });
  }

  public profile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetch('get', 'profile')
        .toPromise()
        .then(
          (re: any) => {
            let l: UserDetails = new UserDetails();
            l = this.copydata(l, re);
            this.saveUser(l);
            resolve(l);
          },
          err => {
            reject(err.error);
          }
        );
    });
  }

  public editprofile(user: any): Promise<any> {
    return this.fetch('post', 'profile/edit', user).toPromise();
  }

  public editpass(user: any): Observable<any> {
    return this.fetch('post', 'profile/editpass', user);
  }

  public requestresetpass(user: any): Observable<any> {
    return this.fetch('post', 'reset-password-request', user);
  }

  public checkDataResetpass(data: any): Observable<any> {
    return this.fetch('post', 'reset-password-check', data);
  }
  public submitNewPassword(data: any): Observable<any> {
    return this.fetch('post', 'reset-password-submit-new', data);
  }

  removeUserItem() {
    window.localStorage.removeItem('bh-user');
  }

  copydata(user: any, data: any) {
    Object.keys(data).forEach(function(key) {
      if (key in user) {
        user[key] = data[key];
      }
    });
    return user;
  }

  public checkInvitationVal(arg) {
    return this.fetch('get', 'cInvitationValData', arg).toPromise();
  }
  public postInvitationVal(arg) {
    return this.fetch('post', 'cInvitationValData', arg).toPromise();
  }

  public registerMember(arg) {
    return this.fetch('post', 'register-member', arg).toPromise();
  }

  public getallOrgTypes() {
    return this.fetch('get', 'org_types').toPromise();
  }

  async userDataRole() {
    try {
      const dataRole = await this.fetch('get', 'getUserRoleData').toPromise();
      if (dataRole['status'] === 'OK') {
        const rl: { [key: string]: any } = dataRole['data'];
        if (rl['hsAc']) {
          if (rl['isAdm']) {
            rl['admDefl'] = rl['admAc'].length === 1 ? rl.admAc[0]._id : '';
          }
          if (rl['isInCom']) {
            rl['commDefl'] = rl['inCom'].length === 1 ? rl['inCom'][0]._id : '';
          }
        }
        localStorage.setItem('_data_role_', JSON.stringify(rl));
      }
    } catch (e) {
      console.log(e);
    }
  }
  public checkInvitationState(argDATA) {
    return this.fetch('get', 'checkinvitation/organisation', argDATA).toPromise();
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem(Globals.localStorageString.TOKEN);
    window.localStorage.removeItem(Globals.localStorageString.DATAROLE);
    window.localStorage.removeItem('accAdmin');
    window.localStorage.removeItem('accCUR');
    window.localStorage.removeItem('gen_flag');
    window.localStorage.removeItem('bh-user');
    window.localStorage.removeItem('my_company');
    this.router.navigateByUrl('/');
  }
}
