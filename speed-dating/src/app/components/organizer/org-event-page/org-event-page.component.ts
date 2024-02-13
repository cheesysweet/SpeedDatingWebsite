import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Event } from 'src/app/Interfaces/Event';
import { Profile } from 'src/app/Interfaces/Profile';
import { Message } from 'src/app/service/Socket/Message';
import { Socket } from 'src/app/service/Socket/socket';
import { Connection } from 'src/app/service/_connections/connection';
import { Tables } from 'src/app/Tables/Tables';
import { Codes } from 'src/app/service/Socket/Codes';
import { Location } from '@angular/common';
import { Meeting } from 'src/app/Interfaces/Meeting';
import { matchmaking } from 'src/app/matchmaking';

const baseMessage: Message = {
  name: 'placeholder',
  message: '',
  stage: 0,
  code: 0,
};

@Component({
  selector: 'app-org-event-page',
  templateUrl: './org-event-page.component.html',
  styleUrls: ['./org-event-page.component.css'],
})
/**
 * Component to handle the Meeting-page, specifically for the organizer
 * @author Sven Englsperger Raswill
 */
export class OrgEventPageComponent implements OnInit {
  @Input() eventID: string = '';
  profiles: Array<Profile> = [];
  organizer: Profile | undefined;
  event: Event | undefined;
  currentMeeting: Meeting | undefined;
  socket: Socket | undefined;

  edit: Boolean = false;
  started: boolean = false;
  beforeNext: boolean = false;
  last: boolean = false;

  message: Message = {
    name: 'placeholder',
    message: '',
    stage: 0,
    code: Codes.NONE,
  };

  happenings: Array<string> = [];
  hasRated: Array<string> = [];

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
          this.hasRated = [];
          if (data.stage > 0) this.started = true;
          if (data.stage >= 3) {
            this.last = true;
          }
          this.getEvent();
          break;
        case Codes.BEFORE_NEXT:
          this.getEvent();
          break;
        case Codes.HAS_RATED:
          var name = this.event?.participants.find((a) => a._id == data.name);
          this.hasRated.push(`${name?.name}: Has Rated`);
          break;
        case Codes.END:
          this.socket?.close();
          this.socket = undefined;
          this.started = false;
          this.getEvent();
          break;
        case Codes.NEW_TABLE:
          var name = this.event?.participants.find((a) => a._id == data.name);
          this.happenings.push(`${name?.name}:  Wants new Table`);
          break;
        case Codes.NEW_MEETING:
          var name = this.event?.participants.find((a) => a._id == data.name);
          this.happenings.push(`${name?.name}:  Wants new Meeting`);
          break;
        default:
          this.getEvent();
          break;
      }
      this.message.code = Codes.NONE;
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => { },
  };

  constructor(
    private conn: Connection,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private match: matchmaking
  ) { }

  ngOnInit(): void {
    // TODO add check for correct user
    if (this.eventID == '') {
      console.log(this.currentRoute.snapshot);
      this.eventID = this.currentRoute.snapshot.paramMap.get('eventID')!!;
    }
    this.getEvent();
  }

  /**
   * Send a request to the API to get the information about the current event
   */
  private getEvent() {
    this.conn.getEvent(this.eventID).subscribe({
      next: (event) => {
        this.event = event;
        this.profiles = event.participants;
        if (this.organizer == undefined) this.organizer = event.organizer;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * Used to start the event
   */
  start(): void {
    this.conn
      .getSpecSocket(
        this.event!!._id.toString(),
        this.event!!.socket.toString()
      )
      .subscribe({
        next: (_socket) => {
          if (this.connect()) {
            this.message.name = this.organizer!!._id!!;
            this.socket!!.startMeeting(this.message);
            this.started = true;
            this.socket?.changeMeetingStage(this.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
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
   * Used to close the Socket
   * Uses the {@link Socket}'s own endMeeting-method
   */
  close(): void {
    this.socket?.endMeeting(baseMessage);
  }

  makeMeetings(): void {
    if(this.event!!.meetings.length > 0) return;
    const event = this.match.matchmake(this.event!!);
    if (event)
      this.conn.postMeetings(event.meetings).subscribe({
        next: (data) => {
          event.meetings = data;
          this.conn.putEvent(event._id, event).subscribe({
            next: (data) => {
              this.event = data;
              console.log(this.event)
            },
            error: (err) => console.log(err),
          });
        },
        error: (err) => console.log(err),
      });
  }

  /**
   * Used to change to the next stage
   * Uses the {@link Socket}'s own changeMeetingStage-method
   */
  nextStage(): void {
    const message = this.message;
    message.name = this.organizer!!.name;
    this.socket?.changeMeetingStage(message);
  }

  beforeNextStage(): void {
    const message = this.message;
    message.name = this.organizer!!.name;
    this.socket?.sendBeforeNext(message);
  }

  public clickedElem: any = { id: 'NONE' };

  /**
   * Used to hide and show an element that is clicked
   * @param elem is the element to hide or show
   */
  showHide(elem: any): void {
    if (this.clickedElem.id == 'NONE') {
      this.clickedElem = elem;
    } else {
      if (this.clickedElem.id == elem.id) {
        this.clickedElem = { id: 'NONE' };
      } else {
        this.clickedElem = elem;
      }
    }
  }

  /**
   * Start to edit an event
   */
  editEvent(): void {
    this.edit = true;
  }

  /**
   * Done editing an event
   */
  saveEvent(): void {
    this.edit = false;
    this.conn.putEvent(this.eventID, this.event!!).subscribe({
      next: (data: Event) => {
        if (data.currentStage == undefined) data.currentStage = 0;
        if (this.socket) {
          const message = this.message;
          message.name = this.organizer!!.name;
          message.stage = data.currentStage;
          this.socket.sendMessage(message);
        } else {
          this.getEvent();
        }
      },
      error: (err) => console.log(err),
    });
  }

  /**
   * Used to navigate back from the page
   */
  back(): void {
    this.location.back();
  }

  remove(index: number): void {
    this.happenings.splice(index, 1);
  }

  /**
   * Handles recieving an event with Tables
   * @param tables are the recieved {@link Tables}
   */
  getTables(tables: Tables): void {
    this.event!!.tables = tables;
  }

  getCurrentTable(user: string): Number | string {
    const table = this.event?.meetings?.find(
      (a) =>
        (a.user1._id == user || a.user2._id == user) &&
        a.meetingNumber == this.event?.currentStage
    )?.table;
    if (table || table == 0) {
      return table.valueOf() + 1;
    } else {
      return 'No assigned table';
    }
  }

  public meeting: Meeting | undefined;

  /**
   * Used to recieve which index was clicked
   * Can be used to further go to the meeting itself
   * @param event is the index-number of the clicked table
   */
  clickedIndex(event: Number): void {
    const meeting = this.event?.meetings.find(
      (a) => a.table == event && a.meetingNumber === this.event?.currentStage
    );
    if (meeting) {
      this.conn.getMeeting(meeting?._id).subscribe({
        next: (data: Meeting) => {
          this.meeting = data;
        },
        error: (err) => console.log(err),
      });
    } else console.log(meeting);
  }

  /**
   * Used to handle what happens when the meeting is doneWithMeeting
   * @param changed - is true if the event should be reloaded, else false
   */
  doneWithMeeting(changed: Boolean) {
    this.meeting = undefined;
    if (!changed) return;
    if (this.socket) {
      this.socket.updateInformation(this.message);
    } else {
      this.getEvent();
    }
  }
}
