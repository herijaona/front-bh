import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../base-http/base-http.service';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';
import { Globals } from './../../globals/globals';

@Injectable()
export class TeamsService extends BaseHttpService {
  constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
    super(http, g, sh);
  }

  teamFrontSaveData(arg: any) {
    return this.fetch('post', 'team_front_video', arg).toPromise();
  }

  teamFrontGetData(arg: any) {
    return this.fetch('get', 'team_front_video', {
      company_slug: arg,
    }).toPromise();
  }

  deleteTmV(arg) {
    return this.fetch('delete', 'team_front_video', {
      tm_video_id: arg,
    }).toPromise();
  }

  updatetmvData(arg) {
    return this.fetch('put', 'team_front_video', arg).toPromise();
  }

  public inviteTeam(da) {
    return this.fetch('post', 'invite-in-team', da).toPromise();
  }

  public getTeamUsers(slug) {
    return this.fetch('get', 'teams-users', {
      company_slug: slug,
    }).toPromise();
  }

  public getUsersTeamsNameFn(arg1, arg2) {
    return this.fetch('get', 'team-details', {
      id_user: arg1,
      accountID: arg2,
    }).toPromise();
  }

  public questionsSendData(arg) {
    return this.fetch('post', 'question-data', arg).toPromise();
  }

  public getTeamData() {
    return this.fetch('get', 'teamsUsers').toPromise();
  }

  public changeRoleAdmin(arg) {
    return this.fetch('put', 'change_roleAdm', arg).toPromise();
  }

  public deleteFromTeamList(arg) {
    return this.fetch('delete', 'delete-from-team', arg).toPromise();
  }

  public getCommunityData() {
    return this.fetch('get', 'getAccountCommunity').toPromise();
  }

  public getAllQuestionsOnCompany(type) {
    return this.fetch('get', 'getallCompanyQuestions', {
      qtype: type,
    }).toPromise();
  }
  public getAllArchivesOnCompany(typeq) {
    return this.fetch('get', 'getallCompanyArchives', {
      qtype: typeq,
    }).toPromise();
  }

  public archiveQuestions(idQ) {
    return this.fetch('post', 'archives_questions', { idQ: idQ }).toPromise();
  }
  public sendResponseTOQuestions(arg) {
    return this.fetch('post', 'reply_questions', arg).toPromise();
  }
  public getDetailsOnQuestion(qID) {
    return this.fetch('get', 'getDetailOnQuestion', {
      qID: qID,
    }).toPromise();
  }

  public getAllInvitationSent() {
    return this.fetch('get', 'getInvitationSent').toPromise();
  }
  public reviveInvitation(invID) {
    return this.fetch('post', 'revive-invitation', {
      invID: invID,
    }).toPromise();
  }

  public sendOrgnisationInvitation(argDATA) {
    return this.fetch('post', 'invite_organisation', argDATA).toPromise();
  }

  public getInProgressInvitations() {
    return this.fetch('get', 'get-org-invitations-inprogress').toPromise();
  }

  public getAcceptedInvitations() {
    return this.fetch('get', 'get-accepted-invitations').toPromise();
  }

  /**
   * addNewCommunities
   */
  public addNewCommunities(arg) {
    return this.fetch('post', 'addAccountNewCommunity', arg).toPromise();
  }

  /**
   * getCommunitiesDataList
   */
  public getCommunitiesDataList() {
    return this.fetch('get', 'getAccountCommDataList').toPromise();
  }

  /**
   * saveUserCommunityData: save change on user DataCommunity
   */
  public saveUserCommunityData(argDATA) {
    return this.fetch('post', 'saveCommDataUser', argDATA).toPromise();
  }

  /**
   * saveNewSubjectCommunity
   argData   */
  public saveNewSubjectCommunity(argData) {
    return this.fetch('post', 'save-new-subjects', argData).toPromise();
  }

  /**
   * getCOMMSUbjectsList: get subjects list
   */
  public getCOMMSUbjectsList(argData) {
    return this.fetch('get', 'getCommSubjectsList', argData).toPromise();
  }

  /**
   * getCommDetailsData
   */
  public getCommDetailsData(argData) {
    return this.fetch('get', 'getCommDetailsData', argData).toPromise();
  }

  /**
   * Get Asked questions
   */
  public getaskedQQ(argDATA) {
    return this.fetch('get', 'getAskedQuestions', argDATA).toPromise();
  }
}
