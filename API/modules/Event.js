import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

/**
 * module for event
 * @author anton byström
 * @author Sven Englsperger Raswill
 */
var eventSchema = new Schema({
  location: String,
  tables: {
    tableList: [{
      x: Number,
      y: Number,
      index: Number
    }],
    size: Number,
    width: Number,
    height: Number
  },
  organizer: { type: _Schema.Types.ObjectId, ref: 'Profile' },
  currentStage: Number,
  map: String,
  socket: Number,
  date: Date,
  participants: [{ type: _Schema.Types.ObjectId, ref: 'Profile' }],
  meetings: [{ type: _Schema.Types.ObjectId, ref: 'Meeting' }]
})

export default model('Event', eventSchema)
