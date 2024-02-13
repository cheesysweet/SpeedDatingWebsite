import { Event } from "./Event";

export interface Profile {
  _id: string | undefined,
  userName: string,
  sex: string,
  name: string,
  password: string,
  organizer: boolean,
  picture: string,
  phoneNumber: number,
  description: string,
  interests: Array<string>,
  events: Array<Event>
}
