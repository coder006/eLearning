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
    updationDate: Date
});

var user = mongoose.model('User', UserSchema);
module.exports = {
    User: user
};