import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection } from 'src/app/service/_connections/connection';
import { Profile } from 'src/app/Interfaces/Profile';
import { Meeting } from 'src/app/Interfaces/Meeting';

@Component({
  selector: 'app-share-contact',
  templateUrl: './share-contact.component.html',
  styleUrls: ['./share-contact.component.css']
})
export class ShareContactComponent {

  profiles: Array<Profile> = [];
  meeting: Array<Meeting> = [];

  constructor(private api: Connection,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    /**
     * by adding "/<userName>/<eventId>" to the route
     * the matches for the user on that event will be shown and
     * the user can choose to share contact details with them.
     */
    const param = this.route.snapshot.paramMap;
    const userName = param.get("userName");
    const eventID = param.get("eventID");
    if (userName !== null && eventID !== null) {
      this.api.getProfile(userName)
        .subscribe(profile =>
          this.api.getEvent(eventID)
            .subscribe(event => this.getProfiles(event.meetings, profile)));
    } else {
      console.log("error, no profile found, running default profile")
      this.api.getProfile('anton')
        .subscribe(profile => 
          this.api.getEvent("639448cc504b35e613e02655")
            .subscribe(event => this.getProfiles(event.meetings, profile)));
    }
  }

  /**
   * stores the profiles of the users met with current profile
   * during current event
   * @param meetings meetings of current event
   */
  getProfiles(meetings: Array<Meeting>, profile: Profile) {
    for (let i = 0; i<meetings.length; i++) {
      if (profile === null) {
        console.log({error: "could not find current profile"})
      } else {
        if (meetings[i].user1._id === profile._id) {
          this.profiles.push(meetings[i].user2)
          this.meeting.push(meetings[i])
        }
        if (meetings[i].user2._id === profile._id) {
          this.profiles.push(meetings[i].user1)
          this.meeting.push(meetings[i])
        }
      }
    }
  }

  /**
   * saves results in the database
   */
  saveResults() {
    this.meeting.forEach(element => {
      this.api.putMeeting(element._id, element).subscribe()
    });
    alert("Details saved!")
  }
}
