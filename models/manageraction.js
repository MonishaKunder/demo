module.exports = function(req,res) {
	
	function approve() {
		user.findOne({_id:id},function(err,doc) {
			if(err) {
				console.log(err);
				res.json({
					status:'failure',
					err : err,
					data: 'failed'
				})
			}
			leaveRecord.find({approverId:doc.personaldata['employee id'],status:'applied'},{},{sort:{from:-1}},function(err,docs) {
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
	var id = req.headers.uniqueid;
	var obj = req.body;
	if(obj.decision==true) {
		leaveRecord.findOne({_id:obj.id},function(err,doc) {
			if(err) {
				console.log(err);
				res.json({
					status : 'failure',
					err : err,
					data: 'failed'
				})
			}
			doc.status = 'approved';
			doc.save(function(err) {
				if(err) {
					console.log(err);
					res.json({
						status : 'failure',
						err : err,
						data: 'failed'
					})
				}				
				approve();	
			})
			
		})
	}
	else {
		if(err) {
			console.log(err);
			res.json({
				status : 'failure',
				err : err,
				data: 'failed'
			})
		}
		leaveRecord.findOne({_id:obj.id},function(err,doc) {
			doc.status = 'rejected';
			doc.save(function(err) {
				if(err) {
					console.log(err);
					res.json({
						status : 'failure',
						err : err,
						data: 'failed'
					})
				}
				approve();
			})			
		})	
	}
}