
module.exports = function(req,res) {
	console.log('approve');
	var id = req.headers.uniqueid;
	user.findOne({_id:id},function(err,doc) {
		if(err) {
			console.log(err);
			res.json({
				status:'failure',
				err : err,
				data: 'failed'
			})
		}
		leaveRecord.find({'approver.id':doc.personaldata['employee id'],status:'applied'},{},{sort:{from:-1}},function(err,docs) {
			if(err) {
				console.log(err);
				res.json({
					status:'failure',
					err : err,
					data: 'failed'
				})
			}
			console.log(docs);
			res.json({
				status:'success',
				err : null,
				data : docs
			})
		})	
	})
}