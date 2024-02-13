import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observer } from 'rxjs';
import { Codes } from 'src/app/service/Socket/Codes';
import { Message } from 'src/app/service/Socket/Message';
import { Socket } from 'src/app/service/Socket/socket';
import { Event } from 'src/app/Interfaces/Event';
import { Connection } from 'src/app/service/_connections/connection';
import { Tables } from 'src/app/Tables/Tables';
import { Meeting } from 'src/app/Interfaces/Meeting';
import { Profile } from 'src/app/Interfaces/Profile';

@Component({
  selector: 'app-user-meeting-page',
  templateUrl: './user-meeting-page.component.html',
  styleUrls: ['./user-meeting-page.component.css'],
})
export class UserMeetingPageComponent implements OnInit {
  @Input() eventID: string = '';
  socket: Socket | undefined;
  event: Event | undefined;
  started: boolean = false;
  @Input() userName: string = '';
  user: Profile | undefined;
  clicked: boolean = false;
  rate: boolean = false;

  public meeting: Meeting | undefined;
  public otherUser: Profile | undefined;

  message: Message = {
    name: 'placeholder',
    message: '',
    stage: 0,
    code: Codes.NONE,
  };

  // Observer that handles getting the messages
  obs: Observer<Message> = {
    /**
     * The next-event is when the next message comes
     * @param data is a {@link Message}
     */
    next: (data: Message) => {
      switch (data.code) {
        case Codes.START:
          this.started = true;
          this.getEvent();
          break;
        case Codes.NEXT:
          if (data.stage > 0) this.started = true;
          this.getEvent();
          break;
        case Codes.BEFORE_NEXT:
          if (this.event?.currentStage!! > 0) this.rate = true;
          break;
        case Codes.END:
          this.socket?.close();
          this.socket = undefined;
          this.started = false;
          if(this.event?.currentStage!! > 0)
            this.router.navigate([`/shareContact/${this.user?.userName}/${this.eventID}`]);
          this.getEvent();
          break;
        default:
          break;
      }
      this.message.code = Codes.NONE;
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {},
  };

  constructor(
    private conn: Connection,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // TODO add check for correct user
    if (this.eventID == '') {
      this.eventID = this.currentRoute.snapshot.paramMap.get('eventID')!!;
    }
    if (this.userName == '') {
      this.userName = this.currentRoute.snapshot.paramMap.get('userName')!!;
    }
    this.getEvent();
  }

  /**
   * Used to check if they are done rating
   */
  doneRating(saved: boolean): void {
    if (saved) {
      this.rate = false;
      this.socket?.sendHasRated(this.message);
    } else {
      alert('Something went wrong');
    }
  }

  /**
   * Used to get a single meeting from an event, based on if the user
   * @param event - either an {@link Event} or potentially undefined
   * @return a {@link Meeting} or undefined
   */
  private getMeeting(event: Event | undefined): Meeting | undefined {
    if (event && this.user) {
      return event.meetings.find(
        (a) =>
          (a.user1._id === this.user?._id || a.user2._id === this.user?._id) &&
          event.currentStage === a.meetingNumber
      )!!;
    }
    return undefined;
  }

  /**
   * Send a request to the API to get the information about the current event
   */
  private getEvent() {
    this.conn.getEvent(this.eventID).subscribe({
      next: (event) => {
        this.event = event;
        if (!this.user) this.getProfile(event);
        else {
          this.meeting = this.getMeeting(event);
          this.otherUser = this.meeting?.user2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * Used to get a profile from the event, and sets the other user in the meeting
   * @param event - is the {@link Event} that the meeting belongs to
   */
  private getProfile(event: Event): void {
    this.conn.getProfile(this.userName).subscribe({
      next: (userData: Profile) => {
        // sentinel to ensure that if a user is not a participant of the vent
        // they cannot see the event as well
        if (event.participants.findIndex((a) => a._id === userData._id) == -1)
          this.back();
        this.user = userData;
        this.meeting = this.getMeeting(event);
        this.otherUser =
          this.meeting?.user1._id == userData._id
            ? this.meeting?.user2
            : this.meeting?.user1;
        this.message.name = userData._id!!;
      },
      error: (err) => console.log(err),
    });
  }

  /**
   * A helper-method that is used to start a connection to a socket
   */
  connect(): boolean {
    this.socket = new Socket(this.event!!.socket, this.obs);
    this.started = true;
    return true;
  }

  /**
   * Handles recieving an event with Tables
   * @param tables are the recieved {@link Tables}
   */
  getTables(tables: Tables): void {
    this.event!!.tables = tables;
  }

  /**
   * Used to close the Socket, and make the variable undefined
   */
  close(): void {
    this.started = false;
    this.socket?.close();
    this.socket = undefined;
  }

  /**
   * Used to request a new Table
   */
  requestNewTable(): void {
    this.socket?.changeTable(this.message);
  }

  /**
   * Used to navigate back from the page
   */
  back(): void {
    this.location.back();
  }
}
