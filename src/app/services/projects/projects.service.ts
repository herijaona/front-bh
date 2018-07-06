import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';
import { BaseHttpService } from '../base-http/base-http.service';
import { Globals } from './../../globals/globals';
import { all } from 'q';

@Injectable()
export class ProjectsService extends BaseHttpService {
  constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
    super(http, g, sh);
  }

  saveNewsProject(arg) {
    return this.fetch('post', 'bh-projects', arg).toPromise();
  }

  getCompanyProject(arg) {
    return this.fetch('get', 'bh-projects', {
      company_slug: arg,
    }).toPromise();
  }

  getProjectByID(arg) {
    return this.fetch('get', 'getProjectbyID', {
      projectID: arg,
    }).toPromise();
  }

  saveEditProject(arg) {
    return this.fetch('put', 'bh-projects', arg).toPromise();
  }

  deleteProject(arg) {
    return this.fetch('delete', 'bh-projects', arg).toPromise();
  }

  public sendProjectsApplication(arg) {
    return this.fetch('post', 'bh-projects-apply', arg).toPromise();
  }

  public getCompanyApplication() {
    return this.fetch('get', 'bh-projects/allCompanyApplication').toPromise();
  }

  public getDetails(applID) {
    return this.fetch('get', 'bh-projects/ApplicationDetails', {
      applID: applID,
    }).toPromise();
  }
  public getAllCollabTpes() {
    return this.fetch('get', 'bh-projects/getAllCollabtype').toPromise();
  }

  public countryGet(t) {
    return this.fetch('get', 'countryList', { type: t }).toPromise();
  }

  public getAllMyCollabList() {
    return this.fetch('get', 'admin-cca/getCollabLists').toPromise();
  }

  public getDataforApply(idPR) {
    return this.fetch('get', 'getDataForApplication', {
      projectID: idPR,
    }).toPromise();
  }
  public getCountryHasCollab() {
    return this.fetch('get', 'getCountryHasCollab').toPromise();
  }

  /**
   * getApplByCollabID
   */
  public getApplByCollabID(cID) {
    return this.fetch('get', 'bh-projects/getApplicationByCollabID', { cID: cID }).toPromise();
  }
  /**
   * getUserApplicationSent
   */
  public getUserApplicationSent() {
    return this.fetch('get', 'bh-projects/getUserSentApplication').toPromise();
  }

  /**
   *  get project as opportuinity
   */

  public getadminProjectAsOpportuinity() {
    return this.fetch('get', 'getOpportuinity-collaborations').toPromise();
  }

  /**
   * Accepte Application
   */
  public sendacceptApplicationData(argData) {
    return this.fetch('post', 'accept-application', argData).toPromise();
  }

  /**
   * sendRefuseApplicationData
   */
  public sendRefuseApplicationData(argDATA: any) {
    return this.fetch('post', 'refuse-application', argDATA).toPromise();
  }

  /**
   * getCollabFilter
   */
  public getCollabFilter(cCountry: string = 'france', typeCollab: string = 'all', areaActivity: string = 'all') {
    return this.fetch('get', 'getCollabFilter', {
      cCountry: cCountry,
      typeCollab: typeCollab,
      areaActivity: areaActivity,
    }).toPromise();
  }

  /**
   * getMyCollaborWith
   */
  public getMyCollaborWith() {
    return this.fetch('get', 'my-collabor_with').toPromise();
  }

  /**
   * Get refused application
   */
  public refusedApplication() {
    return this.fetch('get', 'archived-refused-Application').toPromise();
  }

  /**
   * getDetailsDealBYID
   */
  public getDetailsDealBYID(argID) {
    return this.fetch('get', 'getDealByID', { dID: argID }).toPromise();
  }

  /**
   * getApplicationFirstInDeal
   */
  public getApplicationFirstInDeal(argDATA) {
    return this.fetch('get', 'getApplicationDefl', { dID: argDATA }).toPromise();
  }

  /**
   * getFilesList
   */
  public getFilesList(argDATA) {
    return this.fetch('get', 'getUsersFilesList', { dID: argDATA }).toPromise();
  }
}
