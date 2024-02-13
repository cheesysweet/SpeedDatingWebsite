import profileSchema from './modules/Profile.js';
import meetingSchema from './modules/Meeting.js';
import eventSchema from './modules/Event.js';
import resultSchema from './modules/Date-results.js';

// profiles
var profileA = new profileSchema();
    profileA.UserName = "a@hotmail.com"
    profileA.Name = "anton";
    profileA.Password = "partyIntheHouse";
    profileA.Organizer = true;
    profileA.Picture  = "img.jpg";
    profileA.PhoneNumber = 694208008;
    profileA.Description = "Det var bara ett helvete med det här";
    profileA.Interests = ["dator", "moln", "ost"];
    profileA.Events = [];

var profileB = new profileSchema();
    profileB.UserName = "b@gmail.com"
    profileB.Name = "sven";
    profileB.Password = "partyIntheHouse";
    profileB.Organizer = false;
    profileB.Picture  = "img.jpg";
    profileB.PhoneNumber = 694208008;
    profileB.Description = "Det var bara ett helvete med det här";
    profileB.Interests = ["flyga", "film", "vandra"];
    profileB.Events = [];

var profileC = new profileSchema();
    profileC.UserName = "c@hotmail.com"
    profileC.Name = "alexander";
    profileC.Password = "codingIslife";
    profileC.Organizer = false;
    profileC.Picture  = "img.jpg";
    profileC.PhoneNumber = 555222111;
    profileC.Description = "hej alla fyllon";
    profileC.Interests = ["x", "vatten", "kyl"];
    profileC.Events = [];

// results
var resultA = new resultSchema();
    resultA.User = profileA;
    resultA.ShareDetails = true;
    resultA.Disinterests = ["vatten", "vandra"];
    resultA.Description = "Ja det här va ju kul";

var resultB = new resultSchema();
    resultB.User = profileB;
    resultB.ShareDetails = false;
    resultB.Disinterests = ["x"];
    resultB.Description = "a b c d e f g";

var resultC = new resultSchema();
    resultC.User = profileC;
    resultC.ShareDetails = false;
    resultC.Disinterests = ["film"];
    resultC.Description = "många tester här";

// meetings
var meetingA = new meetingSchema();
    meetingA.User1 = profileA;
    meetingA.User2 = profileB;
    meetingA.Table = 3;
    meetingA.User1Results = resultA;
    meetingA.User2Results = resultB;

var meetingB = new meetingSchema();
    meetingB.User1 = profileC;
    meetingB.User2 = profileB;
    meetingB.Table = 2;
    meetingB.User1Results = resultC;
    meetingB.User2Results = resultB;
    
// events
var eventA = new eventSchema();
    eventA.Location = "rymden";
    eventA.Map = "mapImg";
    eventA.Date = new Date();
    eventA.Participants = [profileA, profileB];
    eventA.Meetings = [meetingA];

var eventB = new eventSchema();
    eventB.Location = "stellaris";
    eventB.Map = "mapImg";
    eventB.Date = new Date();
    eventB.Participants = [profileB, profileA];
    eventB.Meetings = [meetingA];



profileA.Events = [eventA];

var profiles = [profileA, profileB, profileC];
var results = [resultA, resultB, resultC];
var meetings = [meetingA, meetingB];
var events = [eventA, eventB];


export {profiles, results, meetings, events}
