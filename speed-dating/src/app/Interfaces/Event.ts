import { Tables } from "../Tables/Tables";
import { Meeting } from "./Meeting";
import { Profile } from "./Profile";

/**
 * Interface for the event, which contains important information
 */
export interface Event {
  _id: string,
  location: String,
  organizer: Profile,
  tables: Tables,
  currentStage: number,
  socket: number,
  map: string,
  date: Date,
  participants: Array<Profile>,
  meetings: Array<Meeting>,
}
