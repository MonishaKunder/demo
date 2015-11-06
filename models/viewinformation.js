require('../schema')
var domain = require('domain');
var convert = require('./objtoarr');

module.exports = function(req,res) {

  var userid = req.body['uniqueid'];

  user.findOne({_id:userid},function(err,doc) {

    var obj = {};
    obj.personaldata  = doc.personaldata;
    obj.organizationaldata = doc.organizationaldata;
    obj.emergencycontact = doc.emergencycontact;
    obj.address = doc.address;
    obj.userid = doc._id;
    var blah = 'profile';
    convert(req,res,obj,blah);
  });

}



