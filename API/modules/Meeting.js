import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

/**
 * module for meeting
 * @author anton byström
 */

var meetingSchema = new Schema({
    user1: {type: _Schema.Types.ObjectId, ref: 'Profile', required: true},
    user2: {type: _Schema.Types.ObjectId, ref: 'Profile', required: true},
    table: Number,
    user1Results: {
        shareDetails: Boolean,
        disInterests: [String],
        description: String
    },
    user2Results: {
        shareDetails: Boolean,
        disInterests: [String],
        description: String
    },
    meetingNumber: Number
})

export default model('Meeting', meetingSchema);
