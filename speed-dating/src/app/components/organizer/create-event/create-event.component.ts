import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../Interfaces/Event';
import { Profile } from '../../../Interfaces/Profile';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from '../../../service/_connections/connection';
import { Tables } from '../../../Tables/Tables';
import { TableListComponent } from '../../../Tables/table-list/table-list.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  @ViewChild(TableListComponent) tableListComponent:
    | TableListComponent
    | undefined;
  @Output('newEvent') newEvent: EventEmitter<Event> = new EventEmitter();
  public startingTables: Tables = {
    tableList: [
      { x: 0, y: 0 },
      { x: 70, y: 50 },
      { x: 20, y: 40 },
      { x: 100, y: 50 },
    ],
    width: 300,
    height: 150,
    size: 20,
  };
  profile?: Profile;

  createEventForm: FormGroup = this.formBuilder.group({
    location: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private connection: Connection,
    private router: Router
  ) { }

  ngOnInit() {
    const currentUser = this.route.snapshot.paramMap.get('userName');

    this.connection.getProfile(currentUser!).subscribe((profile: Profile) => {
      this.profile = profile;
    });
  }

  onSubmit() {
    const formValues = this.createEventForm.value;
    const dateString = `${formValues.date}T${formValues!.time}:00`;
    const date = new Date(dateString);
    this.connection.getSocket().subscribe((socketNumber) => {
      const newEvent: Event = {
        _id: '',
        location: formValues!.location,
        organizer: this.profile!,
        tables: this.tableListComponent!.tables!,
        currentStage: 0,
        socket: socketNumber.socket,
        map: '',
        date: date,
        participants: [],
        meetings: [],
      };

      this.connection.postEvent(newEvent).subscribe({
        next: (event) => {
          this.newEvent.emit(event);
        },
        error: (err) => console.log(err),
      });

      this.router.navigate(['/orgStartPage', this.profile!.userName]);
    });
  }
}
