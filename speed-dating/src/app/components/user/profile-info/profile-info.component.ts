import { Component, OnInit } from '@angular/core';
import { Connection } from '../../../service/_connections/connection'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private api: Connection) { }


  ngOnInit(): void {
    this.api.loginProfile("anton", { password: "123" }).subscribe(s => console.log(s))
  }

}
