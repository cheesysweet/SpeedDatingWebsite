import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingInfoComponent } from './components/user/meeting-info/meeting-info.component';
import { LoginComponent } from './components/login/login.component';
import { TableTemplateComponent } from './Tables/table-template/table-template.component';
import { ShareContactComponent } from './components/user/share-contact/share-contact.component';
import { RateMeetingComponent } from './components/user/rate-meeting/rate-meeting.component';
import { OrgEventPageComponent } from './components/organizer/org-event-page/org-event-page.component';
import { OrgMeetingPageComponent } from './components/organizer/org-meeting-page/org-meeting-page.component';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
import { UserMeetingPageComponent } from './components/user/user-meeting-page/user-meeting-page.component';
import { RegisterComponent } from './components/user/register/register.component'
import { DisplayEventsComponent } from './components/display-events/display-events.component';
import { EventPageComponent } from './components/user/event-page/event-page.component';
import {CreateEventComponent} from "./components/organizer/create-event/create-event.component";
import {OrgStartPageComponent} from "./components/organizer/org-start-page/org-start-page.component";
import { ParticipantInfoComponent } from './components/organizer/participant-info/participant-info.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'meetingInfo', component: MeetingInfoComponent },
  { path: 'meetingInfo/:userName/:boolean', component: MeetingInfoComponent },
  { path: 'eventPage', component: EventPageComponent},
  { path: 'eventPage/:userName', component: EventPageComponent},
  { path: 'rateMeeting', component: RateMeetingComponent },
  { path: 'rateMeeting/:userName1/:userName2/:meetingID', component: RateMeetingComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'myProfile/:userName', component: MyProfileComponent },
  { path: 'shareContact', component: ShareContactComponent },
  { path: 'shareContact/:userName/:eventID', component: ShareContactComponent },
  { path: 'userMeetingPage/:eventID/:userName', component: UserMeetingPageComponent },
  { path: 'orgEventPage/:eventID', component: OrgEventPageComponent },
  { path: 'orgMeetingPage/:meetingID', component: OrgMeetingPageComponent },
  { path: 'meetingInfo/:userName1/:userName2/:meetingID/:eventID', component: MeetingInfoComponent },
  { path: 'rateMeeting', component: RateMeetingComponent },
  { path: 'rateMeeting/:userName1/:userName2/:meetingID/:eventID', component: RateMeetingComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'myProfile/:userName', component: MyProfileComponent },
  { path: 'shareContact/:userName/:eventID', component: ShareContactComponent },
  { path: 'shareContact/:userName1/:userName2/:meetingID/:eventID', component: ShareContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tableTemplate', component: TableTemplateComponent },
  { path: 'allEvents/:userName', component: DisplayEventsComponent },
  { path: 'createEvent/:userName', component: CreateEventComponent },
  { path: 'tableTemplate', component: TableTemplateComponent },
  { path: 'orgStartPage/:userName', component: OrgStartPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
