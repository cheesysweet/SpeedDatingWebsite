import { Profile } from "./Profile";

export interface Meeting {
  _id: string,
  user1: Profile,
  user2: Profile,
  table: Number,
  user1Results: {
    shareDetails: boolean,
    disInterests: Array<string>,
    description: string
  },
  user2Results: {
    shareDetails: boolean,
    disInterests: Array<string>,
    description: string
  },
  meetingNumber: Number,
}
