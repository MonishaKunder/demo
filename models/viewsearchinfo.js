require('../schema');
var convert = require('./objtoarr');

module.exports = function(req,res) {

  var searchid = req.body.searchid;
  var userid = req.body.uniqueid;

  console.log(searchid);
  console.log(userid);

  user.findOne({_id:searchid},{'organizationaldata.manager':1},function(err,data) {
    console.log( data);
    user.findOne({_id:userid},function(err,docs) {
      console.log(docs);
      if(data.organizationaldata['manager']==docs.personaldata['employee id']) {
        user.findOne({_id:searchid},function(err,doc) {
          var obj = {};
          obj.personaldata = doc.personaldata;
          obj.organizationaldata = doc.organizationaldata;
          obj.address = doc.address;
          obj.emergencycontact = doc.emergencycontact;
          obj.userid = doc._id;
          convert(req,res,obj);
        });
      }

      else {
        user.findOne({_id : searchid},{'personaldata.prefix':1,'personaldata.first name':1,'personaldata.last name':1,'personaldata.preferred name':1,'organizationaldata.job title':1,'organizationaldata.manager':1,'organizationaldata.department':1,'organizationaldata.location':1},function(err,doc) {
          var obj = {};
          obj.personaldata = doc.personaldata;
          obj.organizationaldata = doc.organizationaldata;
          obj.userid = doc._id;
          var blah = 'searchinfo';
          convert(req,res,obj,blah);
        });
      }
    })
  })

}

