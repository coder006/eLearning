var mongoose = require( 'mongoose' );
Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type:String, required: true },
    fname: String,
    lname: String,
    admin: Boolean,
    address: String,
    dob: Date,
    createDate: Date,
    updationDate: Date,
    centre: String,
    levels: {current: {type: String}, completed: [String], remaining: [String]}
});

var LevelSchema = mongoose.Schema({
    levelName: { type: String, required: true, unique: true},
    quizzes: { type: [String], required:true}
});


var level =mongoose.model('Level', LevelSchema);
var user = mongoose.model('User', UserSchema);
module.exports = {
    User: user,
    Level: level
};