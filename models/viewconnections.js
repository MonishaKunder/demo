require('../schema');

module.exports = function(req,res) {
  var userid = req.body['uniqueid'];
  user.find({_id:{$nin : [userid]}},{_id:1,'personaldata.first name':1,'personaldata.last name':1},{sort:{'personaldata.first name':1}},function(err,doc){
    res.send(doc);
  });
}
