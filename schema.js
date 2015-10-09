var mongoose = require('mongoose');

var userschema = new mongoose.Schema({
	personaldata : {},
	organizationaldata : {},
	address : {},
	emergencycontact : {},
	temp : {}
})
/*
var editschema = new mongoose.Schema({
	userid: String,
	oldfields : [],
	newfields : [],
	timestamp : Date
})
*/
usermodel = mongoose.model('employee',userschema);


