import { Component, Input, OnInit } from '@angular/core';
import { Connection } from '../../service/_connections/connection';
import { Event } from '../../Interfaces/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Profile } from '../../Interfaces/Profile';

@Component({
  selector: 'app-display-events',
  templateUrl: './display-events.component.html',
  styleUrls: ['./display-events.component.css'],
})

/**
 * Displays events to the user.
 * @author Alexander Berglund
 */
export class DisplayEventsComponent implements OnInit {
  header: string = 'Upcoming events';
  @Input() profile: Profile | undefined;
  events: Array<Event> = [];

  constructor(private connection: Connection, private route: ActivatedRoute) { }

  /**
   * Gets the profile of the current user as well as all the events.
   */
  ngOnInit(): void {
    if (this.profile === undefined) {
      const currentUser = this.route.snapshot.paramMap.get('userName');
      if (currentUser !== null) {
        this.connection
          .getProfile(currentUser)
          .subscribe((profile: Profile) => {
            this.profile = profile;
          });
      }

      this.connection.getEvents().subscribe((events: Array<Event>) => {
        this.events = events;
        this.events.sort(this.compareDates);
      });
    } else {
      this.connection.getEvents().subscribe((events: Array<Event>) => {
        this.events = events;
        this.events.sort(this.compareDates);
      });
    }

    this.connection.getEvents().subscribe((events: Array<Event>) => {
      this.events = events;
      this.events.sort(this.compareDates);
    });
  }

  /**
   * Used to sort events based on dates. Events with the nearest date will be displayed first.
   */
  compareDates(event1: any, event2: any) {
    const date1 = new Date(event1.date).getTime();
    const date2 = new Date(event2.date).getTime();
    return date1 - date2;
  }
}
