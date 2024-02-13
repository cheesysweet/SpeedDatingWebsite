import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meeting } from 'src/app/Interfaces/Meeting';
import { Event } from 'src/app/Interfaces/Event';
import { Connection } from 'src/app/service/_connections/connection';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/Interfaces/Profile';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-org-meeting-page',
  templateUrl: './org-meeting-page.component.html',
  styleUrls: ['./org-meeting-page.component.css'],
})
/**
 * Component for the organizer to handle meetings
 * @author Sven Englsperger Raswill
 */
export class OrgMeetingPageComponent implements OnInit {
  @Input() event: Event | undefined;
  @Input() meeting: Meeting | undefined;
  @Output('done') done: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  private meetingID: string = '';

  message: string | undefined;

  hidden: boolean = false;
  show: boolean = false;

  meetingList: Array<Meeting> | undefined;

  constructor(private conn: Connection, private currentRoute: ActivatedRoute) { }

  showPart: Profile | undefined;
  showPart2: Profile | undefined;

  /**
   * Fetches the meeting
   */
  ngOnInit(): void {
    if (!this.meeting) {
      this.meetingID = this.currentRoute.snapshot.paramMap.get('meetingID')!!;
      this.getMeeting();
    }
    this.meetingList = this.getAllMeetings();
  }

  /**
   * Used to go back to the previous page
   * @param changed - true if the event should be reloaded, else false
   */
  back(changed: boolean): void {
    this.done.emit(changed);
    this.reloadMeetings();
  }

  /**
   * Used to get a meeting
   */
  private getMeeting(): void {
    this.conn.getMeeting(this.meetingID).subscribe({
      next: (data: Meeting) => {
        this.meeting = data;
      },
      error: (err) => console.log('Error: ', err),
    });
  }

  /**
   * Used to get all meetings from the API
   * @return an Array of {@link Meeting}
   */
  private getAllMeetings(): Array<Meeting> {
    let retVal: Array<Meeting> = [];
    this.event?.meetings.forEach((meeting) =>
      this.conn.getMeeting(meeting._id).subscribe({
        next: (meet: Meeting) => {
          retVal.push(meet);
        },
        error: (err) => {
          console.log('Error while getting a meeting', err);
        },
      })
    );
    return retVal;
  }

  // Below is all about the switcing of the meetings

  public chosenElem1: any | undefined;
  // true = user1 false = user2
  public choice1: boolean = true;
  // true = user1 false = user2
  public chosenElem2: any | undefined;
  public choice2: boolean = true;
  public temp2: Profile | undefined;
  public meetingNumber: string | undefined;

  public tableIndex: Number = -1;
  public table: boolean = false;

  /**
   * Used to reload any meeting-switch-related variables
   */
  reloadMeetings(): void {
    this.choice1 = true;
    this.choice2 = true;
    this.temp2 = undefined;
    this.meetingNumber = undefined;
  }

  /**
   * Used to hide or show the list of tables
   * also resets any tempvalues used to null again
   */
  changeTable(): void {
    this.hidden = !this.hidden;
  }

  /**
   * Used to reset the table-information to default
   */
  resetTable(): void {
    this.table = false;
    this.tableIndex = -1;
  }

  /**
   * Used to save and change the participants
   * First checks if the first put goes through, and then does the next one
   */
  save(): void {
    if (this.tableIndex != -1 && this.table) {
      var otherMeet = this.event?.meetings.find(
        (a) => a.table == this.tableIndex
      );
      if (!otherMeet) return;
      var tempTable = otherMeet.table;
      otherMeet.table = this.meeting!!.table;
      this.conn.putMeeting(otherMeet._id, otherMeet).subscribe({
        next: (data) => {
          this.meeting!!.table = tempTable;
          this.conn.putMeeting(this.meeting!!._id, this.meeting!!).subscribe({
            next: () => {
              this.changeTable();
              this.back(true);
            },
            error: (err) => {
              console.log('Could not put the meeting itself', err);
            },
          });
        },
        error: (err) => console.log('Could not put the first table', err),
      });
    }
    else if (this.temp2 && this.meetingNumber) {
      this.choices(this.choice1, this.choice2)?.subscribe({
        next: () => {
          this.conn.putMeeting(this.meeting!!._id, this.meeting!!).subscribe({
            next: () => {
              this.changeTable();
              this.back(true);
            },
            error: (err) => {
              console.log('Could not put the meeting itself', err);
            },
          });
        },
        error: (err) => console.log('Could not put the choices', err),
      });
    }
  }

  /**
   * Handles the switching of the choices
   * @param choice1 - is true if user1 from the active meeting is to be switch,
   *                else user2
   * @param choice2 - is true if user1 from the other meeting is to be switch,
   *                else user2
   */
  private choices(choice1: boolean, choice2: boolean): Observable<Meeting> | undefined {
    let tempMeeting = this.meetingList?.find(
      (a) => a._id == this.meetingNumber
    );
    let temp: Profile | undefined;
    // Handles the active-meeting users
    if (choice1) {
      temp = this.meeting!!.user1;
      if(temp?.sex == this.temp2?.sex) return undefined;
      this.meeting!!.user1 = this.temp2!!;
    } else {
      temp = this.meeting!!.user2;
      if(temp?.sex == this.temp2?.sex) return undefined;
      this.meeting!!.user2 = this.temp2!!;
    }
    // handles the list-options
    if (choice2) {
      tempMeeting!!.user1 = temp;
    } else {
      tempMeeting!!.user2 = temp;
    }
    return this.conn.putMeeting(tempMeeting!!._id, tempMeeting!!);
  }
}
