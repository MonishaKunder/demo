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
	var id = req.headers.uniqueid;
	var obj = req.body;
	console.log(obj.decision)
	if(obj.decision=="true") {
		console.log('Inside true')
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
	else if(obj.decision=="false"){
		console.log('Inside false')
		leaveRecord.findOne({_id:obj.id},function(err,doc) {
			if(err) {
			console.log(err);
			res.json({
				status : 'failure',
				err : err,
				data: 'failed'
			})
		}
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