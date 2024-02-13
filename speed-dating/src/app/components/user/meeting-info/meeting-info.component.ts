import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection } from 'src/app/service/_connections/connection';
import { Profile } from 'src/app/Interfaces/Profile';

@Component({
  selector: 'app-meeting-info',
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.css'],
})
export class MeetingInfoComponent implements OnInit {
  constructor(private api: Connection, private route: ActivatedRoute) { }

  @Input() profile: Profile | null = null;

  boolean: boolean = false;

  ngOnInit(): void {
    /**
     * by adding "/<userName>" to the route the
     * profile of the user will be shown
     */

    if (this.profile == null) {
      const param = this.route.snapshot.paramMap;
      const userName = param.get('userName');
      const bool = param.get('boolean');
      if (bool === "true") {
        this.boolean = true;
      }

      if (userName !== null) {
        this.api.getProfile(userName).subscribe((res) => {
          this.profile = res;
        });
      } else {
        console.log('error, no profile found, running default profile');
        this.api.getProfile('petricia').subscribe((res) => {
          this.profile = res;
        });
      }
    }
  }
}
