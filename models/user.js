// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	pendingTasks: {type: [String], default: []}, // ??? "pendingTasks" - [String] - The _id fields of the pending tasks that this user has ???
	dateCreated: {type: Date, default: Date.now},
}, {
	versionKey: false,
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
