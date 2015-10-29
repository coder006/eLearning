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
    type: String
});

var LevelSchema = mongoose.Schema({
    levelName: { type: String, required: true, unique: true},
    noOfHours: { type: [Number], required:true}
});


var user = mongoose.model('User', UserSchema);
var level =mongoose.model('Level', LevelSchema);

var CenterSchema = mongoose.Schema({    
    name: String,
    faculty : String,
    coordinator : String,
    location:String
});

var StudentSchema = mongoose.Schema({
    user:[{type: Schema.Types.ObjectId, ref: 'User' }],
    username:String,
    level: String,
    noOfHoursCompleted : Number,
    quizTaken : Boolean,
    quizResult :  Boolean,
    centre : String
});


var centre = mongoose.model('Centre', CenterSchema);
var student = mongoose.model('Student', StudentSchema);


module.exports = {
    User: user,
    Level: level,
    Centre : centre,
    Student : student
};