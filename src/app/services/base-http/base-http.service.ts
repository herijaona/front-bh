import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { UserDetails } from '../../models/user-detail.model';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';
import 'rxjs/add/operator/map';
import { Globals } from './../../globals/globals';

@Injectable()
export class BaseHttpService {
  private endPointUrl: string;
  constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
    this.endPointUrl = this.g.api_baseUrl;
  }

  public fetch(
    method: string = 'GET',
    resource: string = '',
    data_params: { [key: string]: any } = {},
    header: { [key: string]: string } = {}
  ) {
    let _data: any;
    let url = this.endPointUrl + '/api/' + resource;
    _data = data_params;

    if (method === 'get' && Object.keys(data_params).length > 0) {
      url += '?' + this.getFilters(data_params);
      _data = {};
    }

    if (this.getXCompanyID() !== '') {
      header['X-Ccompany-Id'] = this.getXCompanyID();
    }
    console.log(url);
    return this.http.request(method, url, {
      headers: new HttpHeaders(header),
      body: _data,
    });
  }

  public getFilters(data_params: { [key: string]: string } = {}) {
    let filter = '';
    let index = 0;
    const pkey = Object.keys(data_params);
    for (const key of pkey) {
      const ecomm = index ? '&' : '';
      filter += ecomm + key + '=' + data_params[key];
      index++;
    }
    return filter;
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
}
