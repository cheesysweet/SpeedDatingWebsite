import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/Interfaces/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() profile: Profile | null = null; 

  changeColor = [false, false, false];
  
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
