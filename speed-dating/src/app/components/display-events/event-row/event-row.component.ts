import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {Event} from "../../../Interfaces/Event"
import {Profile} from "../../../Interfaces/Profile";
import {ActivatedRoute, Router} from "@angular/router";
import {Connection} from "../../../service/_connections/connection";

@Component({
  selector: 'app-event-row',
  templateUrl: './event-row.component.html',
  styleUrls: ['./event-row.component.css']
})

/**
 * Represents an event.
 * @author Alexander Berglund
 */
export class EventRowComponent implements OnInit {
  @Input() index: number | undefined;
  @Input() event: Event | undefined;
  @Input() profile: Profile | undefined;

  constructor(private connection: Connection, private router: Router) { }

  @HostBinding('class.expanded') isExpanded = false;

  @HostListener('click') onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
  }

  /**
   * Determines the height of the event card based on if it is expanded or not.
   */
  getRowHeight() {
    return this.isExpanded ? '22vh' : '70px';
  }

  /**
   * Used to determine the amount of columns in the <ul> displaying the participants of each event.
   */
  getColumnClass(): string {
    if (this.event!.participants.length <= 5) {
      return 'one-column';
    } else if (this.event!.participants.length <= 10) {
      return 'two-columns';
    } else if (this.event!.participants.length <= 15) {
      return 'three-columns';
    } else {
      return 'four-columns';
    }
  }

  onEditEventClick(eventID: string) {
    this.router.navigate(['/orgEventPage', eventID]);
  }

  goToEvent():void {
    this.router.navigate([`/userMeetingPage/${this.event?._id}/${this.profile?.userName}`])
  }

  onJoinEventClick() {
    for (const profile of this.event!.participants) {
      if (this.profile!._id === profile!._id) {
        return window.alert("You have already joined this event.")
      }
    }

    if (!window.confirm("Are you sure you want to join this event?")) {
      return;  // aborts if the user cancels the quest
    }

    this.event!.participants.push(this.profile!);
    this.connection.putEvent(this.event!._id, this.event!).subscribe(event => {
      console.log("Updated event");
    });

    this.profile!.events.push(this.event!);
    this.connection.putProfile(this.profile!._id!, this.profile!).subscribe(profile => {
      console.log("Added event to profile.")
    });
  }

  profileExistsInEvent() {
    for (const profile of this.event!.participants) {
      if (this.profile!._id === profile!._id) {
        return true;
      }
    }
    return false;
  }
}
