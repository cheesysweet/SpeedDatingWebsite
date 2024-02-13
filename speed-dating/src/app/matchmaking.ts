import { Connection } from "./service/_connections/connection";
import { Profile } from './Interfaces/Profile';
import { Event } from "./Interfaces/Event";
import { Meeting } from './Interfaces/Meeting';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class matchmaking
{
    constructor(private connection: Connection){}

    women: Array<Profile> = [];
    men: Array<Profile> = [];
    meetings: Array<Meeting> = [];
    meeting!: Meeting;

    //takes an event and matchmakes participants
    matchmake(event: Event)
    {

        this.meetings = event.meetings;

        //matchmakes one person per meeting
        for(var m=0; m<3; m++)
        {
          var meeting: Meeting | undefined = undefined;
            //gets all participants
            this.getParticipants(event);
            let temp = this.getRandomInt(this.women.length);

            //makes sure that every man gets 3 meetings with 3 women
            for(var i=0; i <= this.men.length; i++)
            {
                  //checks so no dublicates happens
                do
                {
                  temp = this.getRandomInt(this.women.length);
                }
                while(this.checkIfMeetingExists(this.women[temp], this.men[i], m))

                //makes the meeting
                meeting = {
                    _id: "",
                    user1: this.men[i],
                    user2: this.women[temp],
                    table: i,
                    user1Results: {
                        shareDetails: false,
                        disInterests: [],
                        description: ""
                    },
                    user2Results: {
                        shareDetails: false,
                        disInterests: [],
                        description: ""
                    },
                    meetingNumber: m
                };

                //remove one woman from the pool so they don't get choosen twice per meeting
                const index = this.women.indexOf(this.women[temp], 0);
                if (index > -1) 
                {
                    this.women.splice(index, 1);
                }

                if(meeting)
                  this.meetings.push(meeting);

                if(this.women.length === 0) {

                  break;
                };
            }

            this.men = [];

        }

        return event;
    }

    private getRandomInt(max: number)
    {
        return Math.floor(Math.random() * max);
    }

    //makes men and women into different arrays
    private getParticipants(event: Event)
    {
        for(var i=0; i<event.participants.length; i++)
        {
            if(event.participants[i].sex === "woman")
            {
                this.women.push(event.participants[i]);
            }
            else
            {
                this.men.push(event.participants[i]);
            }
        }
    }

    //check so they don't get meetings with the same person
    private checkIfMeetingExists(women: Profile, man: Profile, meetingNumber: number)
    {
        for(let i=0; i<this.meetings.length; i++)
        {
            if(this.meetings[i].user1.userName === man.userName && this.meetings[i].user2.userName === women.userName)
            {
                if(this.meetings[i].meetingNumber === meetingNumber)
                {
                    return true;
                }
            }
        }
        
        return false;
    }
}

