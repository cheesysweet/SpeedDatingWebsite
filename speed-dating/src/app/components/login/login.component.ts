import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/service/_connections/connection';
import { Profile } from 'src/app/Interfaces/Profile';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private connection: Connection,
    private route: Router,
  ) { }

  profile: Profile | null = null;
  info: string = "";

  username: string = "";
  password: string = "";

  private organizer: boolean = false;

  ngOnInit(): void {
  }

  loadFromDB()
  {
    // Perform the login using the username and password
    this.connection
      .loginProfile(this.username, {password :this.password})
      .subscribe((res) => {
        this.profile = res;

        // If the login is successful, redirect to the right site
        if(res.organizer)
        {
          this.route.navigate(['orgStartPage', this.profile!.userName])
        }
        else
        {
          this.route.navigate(["eventPage/"+this.profile?.userName])
        }
      }, (error) => {
        //Writing alert and showing what was wrong
        alert(error.error.error);
      });
  }
}
