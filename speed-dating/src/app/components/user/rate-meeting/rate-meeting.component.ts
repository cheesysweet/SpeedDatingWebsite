import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/app/Interfaces/Profile';
import { Connection } from 'src/app/service/_connections/connection';
import { Meeting } from 'src/app/Interfaces/Meeting';

@Component({
  selector: 'app-rate-meeting',
  templateUrl: './rate-meeting.component.html',
  styleUrls: ['./rate-meeting.component.css'],
})
export class RateMeetingComponent {
  constructor(private api: Connection, private route: ActivatedRoute) { }

  //profiles
  @Input() currentProfile: Profile | null = null;
  @Input() matchProfile: Profile | null = null;

  @Input() currentMeeting: Meeting | null = null;

  @Output('saved') saved: EventEmitter<boolean> = new EventEmitter();

  //show interests
  dislike: boolean = false;

  //values to store in the database
  shareContact: boolean = false;
  disintrests: Array<string> = [];
  description: string = '';

  ngOnInit(): void {
    /**
     * by adding "/<userName>/<userName>/<meetingID>" to the route
     * where the first user will be able to rate the second user
     */
    if (this.currentProfile && this.matchProfile && this.currentMeeting) {

    } else {
      const param = this.route.snapshot.paramMap;
      const userName1 = param.get('userName1');
      const userName2 = param.get('userName2');
      const meetingID = param.get('meetingID');
      if (
        userName1 !== null &&
        userName2 !== null &&
        meetingID !== null
      ) {
        this.api.getProfile(userName1).subscribe((res) => {
          this.currentProfile = res;
        });
        this.api.getProfile(userName2).subscribe((res) => {
          this.matchProfile = res;
        });
        this.api
          .getMeeting(meetingID)
          .subscribe((res) => (this.currentMeeting = res));
      } else {
        console.log('error, no profile found, running default profile');
        this.api
          .getProfile('anton')
          .subscribe((res) => (this.currentProfile = res));
        this.api
          .getProfile('amelia')
          .subscribe((res) => (this.matchProfile = res));
        this.api
          .getMeeting('6394475e504b35e613e0263b')
          .subscribe((res) => (this.currentMeeting = res));
      }
    }
  }

  /**
   * stores the interests the user did not like.
   * @param event clicked interest
   */
  intrests(event: any) {
    var interest = event.target.firstChild.data;

    if (!this.disintrests.includes(interest)) {
      this.disintrests.push(interest);
    } else {
      const index = this.disintrests.indexOf(interest, 0);
      if (index > -1) {
        this.disintrests.splice(index, 1);
      }
    }
  }

  // boolean if the user disliked any of the intrests
  dislikes(event: any) {
    this.dislike = event.checked === true ? true : false;
  }

  // boolean if the user whant to share details
  share(event: any) {
    this.shareContact = event.checked === true ? true : false;
  }

  /**
   * Saves the rating for the meeting
   */
  saveRating() {
    if (this.currentProfile === null) {
      console.log('error: profile dont exists');
    } else if (this.currentMeeting !== null) {
      this.currentMeeting.user1Results.shareDetails = this.shareContact;
      this.currentMeeting.user1Results.disInterests = this.disintrests;
      this.currentMeeting.user1Results.description = this.description;
      this.api
        .putMeeting(this.currentMeeting._id, this.currentMeeting)
        .subscribe();
      this.saved.emit(true);
    } else {
      alert('No meeting exists between participants');
      this.saved.emit(false);
    }
  }

  /**
   * empty restore fields
   */
  cancel() {
    const dislike = document.getElementById('dislike') as HTMLInputElement;
    const contact = document.getElementById('contact') as HTMLInputElement;
    dislike.checked = false;
    contact.checked = false;
    this.dislike = false;
    this.disintrests = [];
    this.description = '';
  }
}
