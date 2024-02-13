import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/app/Interfaces/Profile';
import { Meeting } from 'src/app/Interfaces/Meeting';

@Component({
  selector: 'app-show-matches',
  templateUrl: './show-matches.component.html',
  styleUrls: ['./show-matches.component.css']
})
export class ShowMatchesComponent {
  @Input() profile: Profile | null = null;
  @Input() meeting: Meeting | null = null;
  shareDetails: boolean = false;
  

  constructor() { }

  /**
   * gets shareDetails of the user
   */
  ngOnInit(): void {
    if (this.profile !== null && this.meeting !== null) {
      if (this.meeting.user1._id === this.profile._id) {
        this.shareDetails = this.meeting.user2Results.shareDetails;
      }
      if (this.meeting.user2._id === this.profile._id) {
        this.shareDetails = this.meeting.user1Results.shareDetails;
      }
    }
  }

  /**
   * stores the new value of shareDetails in Results
   * @param event boolean for checkbox
   */
  share(event: any) {
    if (this.profile !== null && this.meeting !== null) {
      let e = event.checked === true? true: false
      if (this.meeting.user1._id === this.profile._id) {
        this.meeting.user2Results.shareDetails = e;
      }
      if (this.meeting.user2._id === this.profile._id) {
        this.meeting.user1Results.shareDetails = e;
      }
    }
  }
}
