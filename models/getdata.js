var mongoose = require('mongoose');
var csv = require('csv-parser');
var fs = require('fs'); 
require('../schema');

module.exports = function(req,res) {
	event = fs.createReadStream('./files/sample.csv').pipe(csv());
	event.on('data',function(data) {
		console.log(data['preferred name'])
		var personaldetails = {'nationality':data['nationality'],'religion':data['religion'],'ethnicity':data['ethnicity'],'gender':data['gender'],'passport':data['passport'],'spouse name':data['spouse name'],'marriage data':data['marriage date'],'maritial status':data['maritial status'],'birthdate':data['birthdate'],'preferred name':data['preferred name'],'last name':data['last name'],'first name':data['first name'],'title':data['title'],'employee id':data['employee id']};
		var organizationaldetails = {'business area':data['business area'],'cost center':data['cost center'],'exempt':data['exempt'],'employee type':data['employee type'],'division':data['division'],'location':data['location'],'manager':data['manager'],'department':data['department'],'job title':data['job title']};
		var address = {'country':data['country'],'pin':data['pin'],'state':data['state'],'city':data['city'],'reference':data['reference'],'street name':data['street name'],'building number':data['building number'],'building name':data['building name']};
		var emergencycontact = {'emergency mail':data['emergency mail'],'emergency number':data['emergency number'],'emergency relation':data['emergency relation'],'emergency name':data['emergency name']};
		var username = data.username;
		var password = data.password;

		var user = new user({
			personaldata : personaldetails,
			organizationaldata : organizationaldetails,
			address : address,
			emergencycontact : emergencycontact,
			username : username,
			password : password
		});

		user.save(function(err,doc) {
			console.log(doc);
		});
	})	
	
	event.on('end',function() {
		process.exit();
	})
}