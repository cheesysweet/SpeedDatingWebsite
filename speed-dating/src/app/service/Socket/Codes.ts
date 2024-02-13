/**
 * The codes that should be sent by the backend
 * NONE is the "other", so it can represent not just none, but more
 * @author Sven Englsperger Raswill
 */
export enum Codes {
  NONE = 0,
  START = 1,
  NEXT = 2,
  END = 3,
  NEW_TABLE = 4,
  NEW_MEETING = 5,
  BEFORE_NEXT = 6,
  HAS_RATED = 7,
}
