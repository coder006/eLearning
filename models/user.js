var mongoose = require( 'mongoose' );
Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type:String, required: true },
    fname: String,
    lname: String,
    address: String,
    dob: Date,
    aadharCard :String,
    enrollDate: Date,
    centre: String,
    adhaar: String,
    type: String
});

var LevelSchema = mongoose.Schema({
    levelName: { type: String, required: true, unique: true},
    noOfHours: { type: [Number], required:true}
});

var StudentSchema = mongoose.Schema({
    username: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    level: String,
    hours_completed: Number,
    quizTaken: Boolean,
    quizPassed: Boolean
});

var user = mongoose.model('User', UserSchema);
var level =mongoose.model('Level', LevelSchema);

var CenterSchema = mongoose.Schema({    
    name: String,
    faculty : String,
    coordinator : String,
    location:String
});


var centre = mongoose.model('Centre', CenterSchema);
var student = mongoose.model('Student', StudentSchema);

module.exports = {
    User: user,
    Level: level,
    Centre : centre,
    Student : student
};