import { Component, OnInit, } from '@angular/core';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  constructor() { }

  // The number of seconds until the auto-login occurs
  autoLogoutTimeout = 1;
  info: string = "";

    username: string = "";
    password: string = "";

    private userNameDB: string = "";
    private passwordDB: string = "";
    private organizer: boolean = false;

  ngOnInit(): void {
    
  }

  onSubmit() {
    // Get the login form data from the loginForm FormGroup instance
    
    
    // Perform the login using the username and password
    if(this.username == this.userNameDB && this.password == this.passwordDB)
    {
      // If the login is successful, redirect to the right site
      this.loadFromDB();
      
      if(this.organizer)
      {
        window.location.href = 'https://www.google.com/';
      }
      else
      {
        window.location.href = 'https://www.bing.com/';
      }
    }
    else
    {
      // If the login is unsuccessful, show an error message
      alert("Username or password is incorrect");
    }
  }

  loadFromDB()
  {

  }
}
