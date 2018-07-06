import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { GeneralUtilitiesModule } from '../general-utilities/general-utilities.module';

import { ProfileComponent } from './profile/profile.component';
import { CollaborationsComponent } from './collaborations/collaborations.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PInfoComponent } from './profile/p-info/p-info.component';
import { ProjectEditAndNewComponent } from './collaborations/project-edit-and-new/project-edit-and-new.component';
import { InnovationProjectComponent } from './collaborations/project-edit-and-new/innovation-project/innovation-project.component';
import { PCompletionComponent } from './profile/p-completion/p-completion.component';
import { MembersAdminComponent } from './mydesk/members-admin/members-admin.component';
import { AdminAllColabComponent } from './collaborations/admin-all-colab/admin-all-colab.component';
import { CommunitiesComponent } from './communities/communities.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SomeDateComponent } from './collaborations/project-edit-and-new/innovation-project/some-date/some-date.component';
import { ApplyComponent } from './collaborations/apply/apply.component';
import { ApplicationSentComponent } from './collaborations/application-sent/application-sent.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { PositionsComponent } from './positions/positions.component';
import { ApplyInnovProjectComponent } from './collaborations/apply/apply-innov-project/apply-innov-project.component';
import { QuestionComponent } from './collaborations/question/question.component';
import { QuestionsDetailsComponent } from './mydesk/questions-details/questions-details.component';
import { FavoriteComponent } from './mydesk/favorite/favorite.component';
import { InvitedOrganisationComponent } from './mydesk/invited-organisation/invited-organisation.component';
import { MydeskComponent } from './mydesk/mydesk.component';
import { ApplicationComponent } from './collaborations/application/application.component';
import { ViewReactionComponent } from './mydesk/view-reaction/view-reaction.component';
import { ApplicationReceivedComponent } from './collaborations/application-received/application-received.component';
import { EcosystemComponent } from './communities/ecosystem/ecosystem.component';
import { OneCollabApplicationComponent } from './collaborations/one-collab-application/one-collab-application.component';
import { DealSpaceComponent } from './deal-space/deal-space.component';
import { QuestionAnswersComponent } from './deal-space/question-answers/question-answers.component';
import { ApplicationDealComponent } from './deal-space/application-deal/application-deal.component';
import { FilesDealComponent } from './deal-space/files-deal/files-deal.component';
import { PlanningDealComponent } from './deal-space/planning-deal/planning-deal.component';
import { HistoricalComponent } from './mydesk/historical/historical.component';
import { IdeasDeskComponent } from './mydesk/ideas-desk/ideas-desk.component';
import { ApplicationFormComponent } from './collaborations/application-form/application-form.component';
import { InactiveAccountComponent } from './extra/inactive-account/inactive-account.component';
import { ApplicationByCollaborationComponent } from './collaborations/application-by-collaboration/application-by-collaboration.component';
import { ErrorNotificationComponent } from './extra/error-notification/error-notification.component';
import { MembersCommunitiesComponent } from './communities/members-communities/members-communities.component';
import { UnderCommunitiesComponent } from './communities/under-communities/under-communities.component';
import { CommunitySpaceComponent } from './communities/community-space/community-space.component';
import { SettingComponent } from './setting/setting.component';
import { AcceptedInvitationsComponent } from './mydesk/invited-organisation/accepted-invitations/accepted-invitations.component';
import { InviteOrganisationsComponent } from './mydesk/invited-organisation/invite-organisations/invite-organisations.component';
import { InvitationsSentComponent } from './mydesk/invited-organisation/invitations-sent/invitations-sent.component';
import { SpinDataReadyComponent } from './extra/spin-data-ready/spin-data-ready.component';
import { GeneralConfigComponent } from './setting/general-config/general-config.component';
import { SubscriptionComponent } from './setting/subscription/subscription.component';
import { ApplicationSpaceComponent } from './communities/community-space/application-space/application-space.component';
import { FileSpaceComponent } from './communities/community-space/file-space/file-space.component';
import { PaginationInComponent } from './extra/pagination-in/pagination-in.component';
//import for deal space
import { DealSpaceFrontComponent } from './collaborations/deal-space-front/deal-space-front.component';
import { DealHistoricalComponent } from './collaborations/deal-space-front/deal-historical/deal-historical.component';
import { DealListComponent } from './collaborations/deal-space-front/deal-list/deal-list.component';
import { DealApplicationComponent } from './collaborations/deal-space-front/deal-application/deal-application.component';
import { DealFilesComponent } from './collaborations/deal-space-front/deal-files/deal-files.component';
import { DealQuestionsAnswersComponent } from './collaborations/deal-space-front/deal-questions-answers/deal-questions-answers.component';
import { DealPlanningComponent } from './collaborations/deal-space-front/deal-planning/deal-planning.component';
import { OneDealSpaceComponent } from './collaborations/deal-space-front/one-deal-space/one-deal-space.component';
import { DealResumeComponent } from './collaborations/deal-space-front/deal-resume/deal-resume.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule,
    Ng4GeoautocompleteModule.forRoot(),
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    MyDatePickerModule,
    RouterModule,
    GeneralUtilitiesModule,
  ],
  declarations: [
    MydeskComponent,
    ViewReactionComponent,
    CollaborationsComponent,
    ProjectEditAndNewComponent,
    InnovationProjectComponent,
    QuestionsDetailsComponent,
    PInfoComponent,
    MembersAdminComponent,
    PCompletionComponent,
    ProfileComponent,
    NavbarAdminComponent,
    AdminAllColabComponent,
    CommunitiesComponent,
    SomeDateComponent,
    ApplyComponent,
    ApplicationSentComponent,
    FavoriteComponent,
    InvitedOrganisationComponent,
    OpportunitiesComponent,
    PositionsComponent,
    ApplyInnovProjectComponent,
    QuestionComponent,
    ApplicationReceivedComponent,
    ApplicationComponent,
    EcosystemComponent,
    OneCollabApplicationComponent,
    DealSpaceComponent,
    QuestionAnswersComponent,
    ApplicationDealComponent,
    FilesDealComponent,
    PlanningDealComponent,
    HistoricalComponent,
    IdeasDeskComponent,
    ApplicationFormComponent,
    InactiveAccountComponent,
    ApplicationByCollaborationComponent,
    ErrorNotificationComponent,
    MembersCommunitiesComponent,
    UnderCommunitiesComponent,
    CommunitySpaceComponent,
    SettingComponent,
    AcceptedInvitationsComponent,
    InviteOrganisationsComponent,
    InvitationsSentComponent,
    SpinDataReadyComponent,
    GeneralConfigComponent,
    SubscriptionComponent,
    ApplicationSpaceComponent,
    FileSpaceComponent,
    PaginationInComponent,
    DealHistoricalComponent,
    DealListComponent,
    DealApplicationComponent,
    DealFilesComponent,
    DealQuestionsAnswersComponent,
    DealPlanningComponent,
    OneDealSpaceComponent,
    DealSpaceFrontComponent,
    DealResumeComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarAdminComponent],
  entryComponents: [ProjectEditAndNewComponent],
})
export class AdministrationInModule {}
