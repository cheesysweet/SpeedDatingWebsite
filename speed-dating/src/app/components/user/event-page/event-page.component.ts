import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from 'src/app/service/_connections/connection';
import { Profile } from 'src/app/Interfaces/Profile';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  @Input() profile: Profile | undefined
  allMatches: Array<Profile> = [];

  matches: boolean = false;

  constructor(
    private connection: Connection,
    private activeRoute: ActivatedRoute,
    private route: Router) {}

  ngOnInit(): void {
    this.getProfile();
  }

  /**
   * routes to the users profile page
   */
  viewProfile() {
    this.route.navigate(["myProfile/"+this.profile?.userName])
  }

  /**
   * shows matches
   */
  viewMatches() {
    this.matches = this.matches === true? false: true;
  }

  /**
   * routes to the profile of the person that where met
   * @param profile profile
   */
  checkoutProfile(profile: Profile) {
    this.route.navigate(["meetingInfo/"+profile.userName+"/true"])
  }

  /**
   * fetches profile from database
   */
  getProfile() {
    /**
     * by adding "/<userName>" to the route the
     * user will be able to see and edit theire profile
     */
    if (this.profile === undefined) {
      const param = this.activeRoute.snapshot.paramMap;
      const userName = param.get("userName");
      if (userName !== null) {
        this.connection
        .getProfile(userName)
        .subscribe((res) => {
          this.profile = res;
          this.getMatches(res);
        });
      } else {
        console.log("error, no profile found, running default profile")
        this.connection
        .getProfile('carl')
        .subscribe((res) => {
          this.profile = res;
          console.log(res)
          this.getMatches(res);
        });
      }
    }
  }

  /**
   * get all matches from all events for the user
   * @param profile user profile
   */
  getMatches(profile: Profile) {
    profile.events.forEach(event => {
      event.meetings.forEach(meeting => {
        if (profile._id === meeting.user1._id) {
          if (meeting.user1Results.shareDetails && meeting.user2Results.shareDetails) {
            this.allMatches.push(meeting.user2)
          }
        }
        if (profile._id === meeting.user2._id) {
          if (meeting.user1Results.shareDetails && meeting.user2Results.shareDetails) {
            this.allMatches.push(meeting.user1)
          }
        }
      })
    })
  }
}
