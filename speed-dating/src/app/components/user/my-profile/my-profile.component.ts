import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection } from 'src/app/service/_connections/connection';
import { Profile } from 'src/app/Interfaces/Profile';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  @Input() profile: Profile | undefined; // profile
  intrests: Array<string> = [] // curent instrests

  
  ifCrop: boolean = false; // if croping is active
  edit: boolean = false; // if page is active

  // all available intrests
  allIntrests: Array<string> = ['hiking', "movies", "sports", "travel", "food", "gaming", "animals", "liquor", "training"];

  constructor(
    private connection: Connection,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    /**
     * by adding "/<userName>" to the route the
     * user will be able to see and edit theire profile
     */
    this.getProfile();
  }

  /**
   * profile edit
   */
  editButton() {
    this.edit = this.edit === true? false: true;
  }

  /**
   * removes clicked intrests if user is editing profile
   * @param event clicked exsisting intress
   */
  chosenIntrests(event: any) {
    var interest = event.target.firstChild.data;
    const index = this.intrests.indexOf(interest, 0);
    if (this.edit) {
      if (index > -1) {
        this.intrests.splice(index, 1);
      }
    }
  }

  /**
   * stores selected intrest
   * @param intres intrest
   */
  onSelected(intres: string) {
    const index = this.intrests.indexOf(intres, 0)
    if (this.intrests.length < 3 && index === -1) {
      this.intrests.push(intres)
    } else if (this.intrests.length >= 3){
      alert("You already got 3 interests click on a interest to remove it")
    } else {
      alert("You already got this interest")
    }
  }

  /**
   * change sex
   * @param sex sex
   */
  changeSex(sex: string) {
    if (this.profile !== undefined) {
      this.profile.sex = sex;
    }
  }

  /**
   * stores boolean if ifCrop in image-upload is active
   * @param event croping
   */
  updateParent(event: boolean) {
    this.ifCrop = event;
  }

  /**
   * stores updated profile
   */
  saveProfile() {
    this.edit = false;
    if (this.profile && this.profile._id) {
      this.connection.putProfile(this.profile._id, this.profile).subscribe()
    }
    alert("Profile saved")
  }

  /**
   * restore profile
   */
  cancel() {
    this.edit = false;
    this.getProfile();
  }

  /**
   * fetches profile from database
   */
  getProfile() {
    /**
     * by adding "/<userName>" to the route the
     * user will be able to see and edit theire profile
     */
    const param = this.route.snapshot.paramMap;
    const userName = param.get("userName");
    if (userName !== null) {
      this.connection
      .getProfile(userName)
      .subscribe((res) => {
        this.profile = res;
        this.intrests = res.interests;
      });
    } else {
      console.log("error, no profile found, running default profile")
      this.connection
      .getProfile('carl')
      .subscribe((res) => {
        this.profile = res;
        this.intrests = res.interests;
      });
    }
  }
}
