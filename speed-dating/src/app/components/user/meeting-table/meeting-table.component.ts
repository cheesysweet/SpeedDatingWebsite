import {Component, Input, OnInit} from '@angular/core';
import { Meeting } from "../../../Interfaces/Meeting";

@Component({
  selector: 'app-meeting-table',
  templateUrl: './meeting-table.component.html',
  styleUrls: ['./meeting-table.component.css']
})
export class MeetingTableComponent implements OnInit {
  @Input() meeting!: Meeting
  @Input() isActive: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
