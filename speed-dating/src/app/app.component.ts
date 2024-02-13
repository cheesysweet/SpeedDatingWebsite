import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnChanges {
  title = 'speed-dating';
  eventID = "639448cc504b35e613e02656";

  show: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
  ) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.show = this.router.url.includes("login")
  }

  back() {
    this.location.back();
  }
}
