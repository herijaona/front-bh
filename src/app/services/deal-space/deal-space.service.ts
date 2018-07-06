import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';
import { BaseHttpService } from '../base-http/base-http.service';
import { Globals } from './../../globals/globals';

@Injectable()
export class DealSpaceService extends BaseHttpService {
  constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
    super(http, g, sh);
  }

  getDealSpaceList() {
    return this.fetch('get', 'deal/list').toPromise();
  }

  updateFilesUserAdd(arg) {
    return this.fetch('post', 'updatesFilesAdder', arg).toPromise();
  }
}
