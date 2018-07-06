import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* Component Import*/
import { SuccessStoriesComponent } from '../success-stories/success-stories/success-stories.component';
import { MindsetComponent } from '../mindset/mindset/mindset.component';
import { DescriptionProjectComponent } from '../projects/description-project/description-project.component';
import { ProjectsComponent } from '../projects/projects/projects.component';
import { TeamComponent } from '../team/team/team.component';
import { HomepageComponent } from '../homepage/homepage/homepage.component';
import { RegistrationComponent } from '../user-auth/registration/registration.component';
import { ResetPasswordComponent } from '../user-auth/reset-password/reset-password.component';
import { ActivationComponent } from '../user-auth/activation/activation.component';
import { PageLoginComponent } from '../user-auth/page-login/page-login.component';
import { IsloggedVerifyGuard } from '../services/authguard/islogged-verify.guard';
import { AuthguardService } from '../services/authguard/authguard.service';
import { IsActiveGuardService } from '../services/authguard/is-active-guard.service';
import { InvitedRegisterComponent } from '../user-auth/invited-register/invited-register.component';
import { SignUpComponent } from '../user-auth/sign-up/sign-up.component';
import { ApplicationReceivedComponent } from '../administration-in/collaborations/application-received/application-received.component';
import { ApplicationByCollaborationComponent } from '../administration-in/collaborations/application-by-collaboration/application-by-collaboration.component';
import { Project1Component } from '../c-capital/project1/project1.component';
import { ProjectDescriptionComponent } from '../c-capital/project-description/project-description.component';
import { ProfileComponent } from '../administration-in/profile/profile.component';
import { MembersAdminComponent } from '../administration-in/mydesk/members-admin/members-admin.component';
import { QuestionsDetailsComponent } from '../administration-in/mydesk/questions-details/questions-details.component';
import { AdminAllColabComponent } from '../administration-in/collaborations/admin-all-colab/admin-all-colab.component';
import { ProjectEditAndNewComponent } from '../administration-in/collaborations/project-edit-and-new/project-edit-and-new.component';
import { ApplicationSentComponent } from '../administration-in/collaborations/application-sent/application-sent.component';
import { ApplyComponent } from '../administration-in/collaborations/apply/apply.component';
import { CollaborationsComponent } from '../administration-in/collaborations/collaborations.component';
import { QuestionComponent } from '../administration-in/collaborations/question/question.component';
import { ApplicationFormComponent } from '../administration-in/collaborations/application-form/application-form.component';
import { IdeasDeskComponent } from '../administration-in/mydesk/ideas-desk/ideas-desk.component';
import { FavoriteComponent } from '../administration-in/mydesk/favorite/favorite.component';
import { AcceptedInvitationsComponent } from '../administration-in/mydesk/invited-organisation/accepted-invitations/accepted-invitations.component';
import { InviteOrganisationsComponent } from '../administration-in/mydesk/invited-organisation/invite-organisations/invite-organisations.component';
import { InvitationsSentComponent } from '../administration-in/mydesk/invited-organisation/invitations-sent/invitations-sent.component';
import { ApplicationComponent } from '../administration-in/collaborations/application/application.component';
import { InvitedOrganisationComponent } from '../administration-in/mydesk/invited-organisation/invited-organisation.component';
import { MydeskComponent } from '../administration-in/mydesk/mydesk.component';
import { CommunitiesComponent } from '../administration-in/communities/communities.component';
import { EcosystemComponent } from '../administration-in/communities/ecosystem/ecosystem.component';
import { MembersCommunitiesComponent } from '../administration-in/communities/members-communities/members-communities.component';
import { UnderCommunitiesComponent } from '../administration-in/communities/under-communities/under-communities.component';
import { CommunitySpaceComponent } from '../administration-in/communities/community-space/community-space.component';
import { ApplicationSpaceComponent } from '../administration-in/communities/community-space/application-space/application-space.component';
import { FileSpaceComponent } from '../administration-in/communities/community-space/file-space/file-space.component';
import { OpportunitiesComponent } from '../administration-in/opportunities/opportunities.component';
import { PositionsComponent } from '../administration-in/positions/positions.component';
import { SettingComponent } from '../administration-in/setting/setting.component';
import { GeneralConfigComponent } from '../administration-in/setting/general-config/general-config.component';
import { SubscriptionComponent } from '../administration-in/setting/subscription/subscription.component';
import { DealSpaceComponent } from '../administration-in/deal-space/deal-space.component';
import { QuestionAnswersComponent } from '../administration-in/deal-space/question-answers/question-answers.component';
import { ApplicationDealComponent } from '../administration-in/deal-space/application-deal/application-deal.component';
import { FilesDealComponent } from '../administration-in/deal-space/files-deal/files-deal.component';
import { PlanningDealComponent } from '../administration-in/deal-space/planning-deal/planning-deal.component';
import { ViewReactionComponent } from '../administration-in/mydesk/view-reaction/view-reaction.component';
import { HistoricalComponent } from '../administration-in/mydesk/historical/historical.component';
import { InactiveAccountComponent } from '../administration-in/extra/inactive-account/inactive-account.component';
import { ErrorNotificationComponent } from '../administration-in/extra/error-notification/error-notification.component';
import { ReplyOrgInvitationComponent } from '../user-auth/reply-org-invitation/reply-org-invitation.component';
import { AcceuilComponent } from '../c-capital/acceuil/acceuil.component';
import { EntrepriseComponent } from '../c-capital/entreprises/entreprises.component';

// import for deal space
import { DealSpaceFrontComponent } from '../administration-in/collaborations/deal-space-front/deal-space-front.component';
import { DealHistoricalComponent } from '../administration-in/collaborations/deal-space-front/deal-historical/deal-historical.component';
import { DealListComponent } from '../administration-in/collaborations/deal-space-front/deal-list/deal-list.component';
import { DealApplicationComponent } from '../administration-in/collaborations/deal-space-front/deal-application/deal-application.component';
import { DealQuestionsAnswersComponent } from '../administration-in/collaborations/deal-space-front/deal-questions-answers/deal-questions-answers.component';
import { DealFilesComponent } from '../administration-in/collaborations/deal-space-front/deal-files/deal-files.component';
import { DealPlanningComponent } from '../administration-in/collaborations/deal-space-front/deal-planning/deal-planning.component';
import { OneDealSpaceComponent } from '../administration-in/collaborations/deal-space-front/one-deal-space/one-deal-space.component';
import { DealResumeComponent } from '../administration-in/collaborations/deal-space-front/deal-resume/deal-resume.component';
import { DealResolverIdService } from '../services/resolver/deal-resolver-id.service';
import { DealApplicationIdDealService } from '../services/resolver/deal-application-id-deal.service';
import { DealApplicationIdService } from '../services/resolver/deal-application-id.service';
import { DealFilesService } from '../services/resolver/deal-files.service';

// import { UserAuthModule } from '../user-auth/user-auth.module';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'project1',
    component: Project1Component,
  },
  {
    path: 'open-innovation/:slug_acc/acceuil',
    component: MindsetComponent,
  },
  {
    path: 'open-innovation/:slug_acc/team',
    component: TeamComponent,
  },
  {
    path: 'open-innovation/:slug_acc/projects',
    component: ProjectsComponent,
  },
  {
    path: 'open-innovation/:slug_acc/details-project/:project_id',
    component: DescriptionProjectComponent,
  },
  {
    path: 'open-innovation/:slug_acc/success-stories',
    component: SuccessStoriesComponent,
  },
  {
    path: 'register-organisation',
    component: RegistrationComponent,
    canActivate: [IsloggedVerifyGuard],
  },
  {
    path: 'register-organisation/byInvitation/:id_invitation',
    component: RegistrationComponent,
    canActivate: [IsloggedVerifyGuard],
  },
  {
    path: 'activate/:code',
    component: ActivationComponent,
  },
  {
    path: 'login',
    component: PageLoginComponent,
    canActivate: [IsloggedVerifyGuard],
  },
  {
    path: 'sign-in',
    component: SignUpComponent,
    canActivate: [IsloggedVerifyGuard],
  },
  {
    path: 'administration-in/user/profile',
    component: ProfileComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'administration-in/account-note',
    component: InactiveAccountComponent,
    canActivate: [IsActiveGuardService],
  },
  {
    path: 'administration-in/desk',
    component: MydeskComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: MembersAdminComponent,
      },
      {
        path: 'questions',
        component: ViewReactionComponent,
      },
      {
        path: 'ideas',
        component: IdeasDeskComponent,
      },
      {
        path: 'questions/details/:qID',
        component: QuestionsDetailsComponent,
      },
      {
        path: 'favorite',
        component: FavoriteComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'invited-organisation',
        component: InvitedOrganisationComponent,
        canActivate: [AuthguardService],
        children: [
          {
            path: '',
            component: AcceptedInvitationsComponent,
          },
          {
            path: 'invitations-organisation',
            component: InviteOrganisationsComponent,
          },
          {
            path: 'invitations-sent',
            component: InvitationsSentComponent,
          },
        ],
      },
      {
        path: 'historical',
        component: HistoricalComponent,
      },
    ],
  },
  {
    path: 'administration-in/collaborations',
    component: CollaborationsComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: AdminAllColabComponent,
      },
      {
        path: 'apply-to/:id_project',
        component: ApplyComponent,
      },
      {
        path: 'application-sent',
        component: ApplicationSentComponent,
      },
      {
        path: 'application-received/by-collaborations/:idCollab',
        component: ApplicationByCollaborationComponent,
      },
      {
        path: 'application-received',
        component: ApplicationReceivedComponent,
      },
      {
        path: 'create/:item-slug',
        component: ProjectEditAndNewComponent,
      },
      {
        path: 'application-received/details/:applicationID',
        component: ApplicationComponent,
      },
      {
        path: 'questions',
        component: QuestionComponent,
      },
      {
        path: 'questions/details/:qID',
        component: QuestionsDetailsComponent,
      },
      {
        path: 'application-form',
        component: ApplicationFormComponent,
      },
      {
        path: 'deal-space',
        component: DealSpaceFrontComponent,
        children: [
          {
            path: 'historical',
            component: DealHistoricalComponent,
          },
          {
            path: 'list',
            component: DealListComponent,
          },
          {
            path: 'deal/:idDeal',
            component: OneDealSpaceComponent,
            resolve: { dealDetails: DealResolverIdService },
            children: [
              {
                path: 'de',
                component: DealResumeComponent,
              },
              {
                path: '',
                component: DealApplicationComponent,
                resolve: {
                  dataApplication: DealApplicationIdDealService,
                },
              },
              {
                path: 'application/:idAppl',
                component: DealApplicationComponent,
                resolve: {
                  dataApplication: DealApplicationIdService,
                },
              },
              {
                path: 'files/:idAppl',
                component: DealFilesComponent,
                resolve: {
                  dataApplication: DealFilesService,
                },
              },
              {
                path: 'questions-answers/:idAppl',
                component: DealQuestionsAnswersComponent,
              },
              {
                path: 'planning/:idAppl',
                component: DealPlanningComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'administration-in/communities',
    component: CommunitiesComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: MembersCommunitiesComponent,
      },
      {
        path: 'ecosystem',
        component: EcosystemComponent,
      },
      {
        path: 'communities',
        component: UnderCommunitiesComponent,
      },
      {
        path: 'community-space/:commID',
        component: CommunitySpaceComponent,
        children: [
          {
            path: 'application-space',
            component: ApplicationSpaceComponent,
          },
          {
            path: 'files',
            component: FileSpaceComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'administration-in/setting',
    component: SettingComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: 'config',
        component: GeneralConfigComponent,
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },
    ],
  },
  {
    path: 'administration-in/opportunities',
    component: OpportunitiesComponent,
    canActivate: [AuthguardService],
    children: [],
  },
  {
    path: 'administration-in/positions',
    component: PositionsComponent,
    canActivate: [AuthguardService],
    children: [],
  },
  {
    path: 'administration-in/deal-space',
    component: DealSpaceComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: 'question-answers',
        component: QuestionAnswersComponent,
      },
      {
        path: 'application',
        component: ApplicationDealComponent,
      },
      {
        path: 'files',
        component: FilesDealComponent,
      },
      {
        path: 'planning',
        component: PlanningDealComponent,
      },
    ],
  },

  {
    path: 'c-capital/description-project',
    component: ProjectDescriptionComponent,
  },
  {
    path: 'c-capital/accueil',
    component: AcceuilComponent,
  },
  {
    path: 'c-capital/entreprise',
    component: EntrepriseComponent,
  },
  {
    path: 'c-capital/innovations',
    children: [{ path: '', component: Project1Component }],
  },
  {
    path: 'reset-my-pass/:id_/:pass_code',
    component: ResetPasswordComponent,
  },
  {
    path: 'invitation_response/:acc_slug/invitation/:invit_id',
    component: InvitedRegisterComponent,
  },
  {
    path: 'reply-invitation/organisation/:id_invitation',
    component: ReplyOrgInvitationComponent,
  },
  {
    path: 'error-notification',
    component: ErrorNotificationComponent,
  },
  { path: '**', redirectTo: '/error-notification' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class OwnRouterModule {}
