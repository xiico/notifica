// load the things we need
var mongoose = require('mongoose');
const {Schema} = mongoose;

// define the schema for our user model
var development = mongoose.Schema({
    class: { type: Schema.Types.ObjectId },
	student: { type: Schema.Types.ObjectId},
	observation: String,
	assessment: { type: Schema.Types.ObjectId},
	date: Date,
});

// create the model for clanHistory and expose it to our app
module.exports = mongoose.model('studentdevelopments', development);
