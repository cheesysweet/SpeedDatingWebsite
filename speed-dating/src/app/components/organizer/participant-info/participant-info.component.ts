import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Connection} from "../../../service/_connections/connection";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../../Interfaces/Profile";
import {Event} from "../../../Interfaces/Event";
import {Socket} from "../../../service/Socket/socket";
import {Meeting} from "../../../Interfaces/Meeting";

@Component({
  selector: 'app-participant-info',
  templateUrl: './participant-info.component.html',
  styleUrls: ['./participant-info.component.css']
})
export class ParticipantInfoComponent implements OnInit {
  @Input() participant1: Profile | undefined;
  @Input() participant2: Profile | undefined;
  @Input() meeting: Meeting | undefined;

  userNumber: string | null = '';
  isUSer1: boolean = false;

  isUser1_Description: boolean = false;
  isUser2_Description: boolean = false;
  user1_Description: string = '';
  user2_Description: string = '';

  constructor(
    private connection: Connection,
    private currentRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getMeetingInfo();
    this.getUserNumber();

  }

  getMeetingInfo() {
    const param = this.currentRoute.snapshot.paramMap;
    const meetingID = param.get("meetingID");
    if (meetingID !== null) {
      this.connection
        .getMeeting(meetingID)
        .subscribe(res => {
          this.meeting = res;
          this.participant1 = this.meeting.user1;
          this.participant2 = this.meeting.user2;

          if(this.meeting.user1Results.description !== null)
          {
            this.isUser1_Description = true
            this.user1_Description = this.meeting.user1Results.description
          }

          if(this.meeting.user2Results.description !== null)
          {
            this.isUser2_Description = true
            this.user2_Description = this.meeting.user2Results.description
          }
        })
    }
  }


  private getUserNumber() {
    const param = this.currentRoute.snapshot.paramMap;
    const userNumber = param.get("userNumber");
    if(userNumber == "1")
      this.isUSer1 = true;
    else
      this.isUSer1 = false;
  }
}
