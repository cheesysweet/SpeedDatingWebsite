import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

/**
 * module for profile
 * @author anton byström
 */

var profileSchema = new Schema({
    userName: {type: String, required: true},
    name: String,
    sex: String, // man or woman
    password: {type: String, required: true},
    organizer: {type: Boolean, required: true},
    picture: String, // store link to file server for images
    phoneNumber: Number,
    description: String,
    interests: [String],
    events: [{type: _Schema.Types.ObjectId, ref: 'Event'}]
})

export default model('Profile', profileSchema);