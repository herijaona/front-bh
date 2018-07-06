import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../base-http/base-http.service';
import { Globals } from './../../globals/globals';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';

@Injectable()
export class ApiHttpService extends BaseHttpService {
  constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
    super(http, g, sh);
  }

  postUpImages(data: any) {
    return this.fetch('post', 'up_images', data);
  }

  postUpMImages(data: any, typ) {
    return this.fetch('post', 'up_Mimages', data, { 'X-Type-Data': typ });
  }

  /*Request Activation */
  postReqActivation(text_) {
    return this.fetch('post', 'activate', text_);
  }

  /*Uploads Image to the server */
  formImUpload(inputEl: HTMLInputElement) {
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    const promise = new Promise((resolve, reject) => {
      if (fileCount === 0) {
        resolve({
          status: 0,
          data: null,
        });
      } else {
        formData.append('im_up', inputEl.files.item(0), inputEl.files.item(0).name);
        this.postUpImages(formData)
          .toPromise()
          .then(
            (resp: any) => {
              if (resp.status === 'OK') {
                resolve({
                  status: 1,
                  data: resp,
                });
              }
            },
            err => {
              reject({ status: 0, data: err.error });
            }
          );
      }
    });
    return promise;
  }

  /*Uploads Image to the server */
  formImMultiUpload(inputEl: HTMLInputElement, type_) {
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();

    const promise = new Promise((resolve, reject) => {
      if (fileCount === 0) {
        resolve({
          status: 0,
          data: null,
        });
      } else {
        for (let i_ = 0; i_ < fileCount; ++i_) {
          formData.append('biblio[]', inputEl.files.item(i_), inputEl.files.item(i_).name);
        }

        this.postUpMImages(formData, type_)
          .toPromise()
          .then(
            (resp: any) => {
              if (resp.status === 'OK') {
                resolve({
                  status: 1,
                  data: resp,
                });
              }
            },
            err => {
              reject({ status: 0, data: err.error });
            }
          );
      }
    });
    return promise;
  }
}
