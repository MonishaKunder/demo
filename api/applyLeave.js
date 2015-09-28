
var async=require('async')

module.exports=function(app,opt,schema){
    var user=schema.user;
    var leaveRecord=schema.leaveRecord;
	app.post('/applyLeave',function(req,res){
		console.log("ApplyLeave")
		var obj=req.body;
		var id=obj.id;
		var days;
		var dFrom=obj.from.split('-');
		var dTo=obj.to.split('-');
		var from=new Date(dFrom[0],dFrom[1]-1,dFrom[2])
		var to=new Date(dTo[0],dTo[1]-1,dTo[2])
		if(obj.halfday=='true')
			days=0.5;
		else
			days=(to-from)/(3600*24*1000)+1;
		async.waterfall([
			function(callback){
				user.findById(id,{reportingTo:1,},function(err,doc){
					if(err)
						callback(err)
					else
						callback(null,doc)
				})
			},
			function(doc,callback){
				var lObj={
					appliedOn:new Date(Date.now()),
					from:from,
					to:to,
					type:obj.type,
					halfDay:obj.halfday,
					applierId:id,
					approverId:doc.reportingTo,
					reason:obj.reason,
					noOfDays:days
				}
				var l=new leaveRecord(lObj);
				l.save(function(err, result){
					if(err)
						callback(err)
					else
						callback(null,result)
				})

			}],function(err,result){
				if(err)
				{
					res.json({
						statusCode:500,
						err:err,
						data:null
					})
					console.log(err)
				}
				else
				{
					console.log("Success")
					res.json({
						statusCode:200,
						err:null,
						data:result
					})
				}
				
			})
	})

}

