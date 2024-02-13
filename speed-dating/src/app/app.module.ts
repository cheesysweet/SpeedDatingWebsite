import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableListComponent } from './Tables/table-list/table-list.component';
import { DisplayTablesComponent } from './Tables/display-tables/display-tables.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MeetingInfoComponent } from './components/user/meeting-info/meeting-info.component';
import { ProfileInfoComponent } from './components/user/profile-info/profile-info.component';
import { InterestsComponent } from './components/user/interests/interests.component';
import { MeetingTableComponent } from './components/user/meeting-table/meeting-table.component';
import { ParticipantInfoComponent } from './components/organizer/participant-info/participant-info.component';
import { FlaggedComponent } from './components/organizer/flagged/flagged.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { OrgEventPageComponent } from './components/organizer/org-event-page/org-event-page.component';
import { TableTemplateComponent } from './Tables/table-template/table-template.component';
import { ProfileImageComponent } from './components/user/profile-image/profile-image.component';
import { ShareContactComponent } from './components/user/share-contact/share-contact.component';
import { ShowMatchesComponent } from './components/user/show-matches/show-matches.component';
import { RateMeetingComponent } from './components/user/rate-meeting/rate-meeting.component';
import { DisplayEventsComponent } from './components/display-events/display-events.component';
import { ChunkPipe } from './pipes/chunk.pipe';
import { EventRowComponent } from './components/display-events/event-row/event-row.component';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserMeetingPageComponent } from './components/user/user-meeting-page/user-meeting-page.component';
import { OrgMeetingPageComponent } from './components/organizer/org-meeting-page/org-meeting-page.component';
import { CreateEventComponent } from './components/organizer/create-event/create-event.component';
import { EventPageComponent } from './components/user/event-page/event-page.component';
import { OrgStartPageComponent } from "./components/organizer/org-start-page/org-start-page.component";

@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    DisplayTablesComponent,
    ImageUploadComponent,
    LoginComponent,
    RegisterComponent,
    EventRowComponent,
    MeetingInfoComponent,
    ProfileInfoComponent,
    InterestsComponent,
    MeetingTableComponent,
    ParticipantInfoComponent,
    FlaggedComponent,
    ImageUploadComponent,
    LoginFormComponent,
    OrgEventPageComponent,
    TableTemplateComponent,
    ProfileImageComponent,
    ShareContactComponent,
    ShowMatchesComponent,
    RateMeetingComponent,
    OrgStartPageComponent,
    MyProfileComponent,
    DisplayEventsComponent,
    ChunkPipe,
    OrgMeetingPageComponent,
    ImageUploadComponent,
    ShareContactComponent,
    ShowMatchesComponent,
    UserMeetingPageComponent,
    CreateEventComponent,
    EventPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AppModule {}
