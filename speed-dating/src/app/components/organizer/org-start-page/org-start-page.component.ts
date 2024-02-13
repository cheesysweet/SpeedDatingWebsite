import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../../Interfaces/Profile';
import { Connection } from '../../../service/_connections/connection';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-org-start-page',
  templateUrl: './org-start-page.component.html',
  styleUrls: ['./org-start-page.component.css'],
})
export class OrgStartPageComponent implements OnInit {
  profile?: Profile;

  constructor(
    private connection: Connection,
    private rotuer: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const currentUser = this.route.snapshot.paramMap.get('userName');
    if (currentUser != null) {
      this.connection.getProfile(currentUser).subscribe((profile: Profile) => {
        this.profile = profile;
      });
    }
  }

  onCreateEventClick() {
    this.rotuer.navigate(['/createEvent', this.profile!.userName]);
  }

  onViewProfileClick() {
    this.rotuer.navigate(['/myProfile', this.profile!.userName]);
  }
}
