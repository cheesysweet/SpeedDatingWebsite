import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Connection } from '../../../service/_connections/connection';
import { Profile } from '../../../Interfaces/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // @ts-ignore

  newProfile: Profile;

  // Boolean to Check Submit is Pressed

  submitted: boolean = false;

  // Form Group

  registerForm: FormGroup = this.formBuilder.group({
    UserName: ['', Validators.required],

    Name: ['', Validators.required],

    Organizer: ['', Validators.required],

    Password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private connection: Connection,
    private router: Router
  ) { }

  ngOnInit(): void { }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.newProfile = {
      _id: undefined,
      password: '',
      userName: '',
      sex: '',
      name: '',
      organizer: false,
      picture: '',
      phoneNumber: 0,
      description: '',
      interests: [],
      events: [],
    };

    this.submitted = true;

    this.newProfile.userName = this.registerForm.controls['UserName'].value;
    this.newProfile.name = this.registerForm.controls['Name'].value;
    this.newProfile.organizer = false;
    this.newProfile.password = this.registerForm.controls['Password'].value;
    this.newProfile.organizer = false;

    this.connection.postProfile(this.newProfile).subscribe({
      next: (res) => {
        this.router.navigate(['eventPage/' + this.newProfile?.userName]);
      },
      error: (error) => {
        console.log(error.error.error);
      },
    });
  }
}
