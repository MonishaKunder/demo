var async=require('async')
var mongoose=require('mongoose')
require('../schema');

module.exports=function(req,res){
	
		var obj=req.body;
		var id=obj.uniqueid;
		var days;
		var halfdays;
		var dFrom=obj.from.split('-');
		var dTo=obj.to.split('-');
		/*
		if(obj.from.halfday==true) {
			halfdays += 0.5;
		}
		if(obj.to.halfday==true) {
			halfdays += 0.5;
		}
		*/
		if(obj.halfday==true) {
			days = 0.5
		}
		else {
			days=(new Date(dTo[0],dTo[1]-1,dTo[2])- new Date(dFrom[0],dFrom[1]-1,dFrom[2]))/(3600*24*1000)+1;
		}

		//days -= halfdays;
		async.waterfall([
			function(callback){
				user.findById(id,{'organizationaldata.manager':1,personaldata:1,username:1},function(err,doc){
					if(err)
						callback(err)
					else
						callback(null,doc)
				})
			},
			function(doc,callback){
				console.log(doc.username);
				var lObj={
					appliedOn:new Date(Date.now()),
					from:new Date(obj.from).toISOString(),
					to:new Date(obj.to).toISOString(),
					type:obj.type,
					halfDay:obj.halfday,
					applierId:{displayName:doc.personaldata['first name']+" "+doc.personaldata['last name'],
								email:doc.username,
								id:id,
								avatartUrl:""},
					approverId:doc.organizationaldata.manager,
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
					console.log(err);
					res.json({
						status:"failure",
						err:err,
						data:null
					})
					console.log(err)
				}
				else
				{
					console.log("Success")
					res.json({
						status:"success",
						err:null,
						data:result
					})
				}
				
			})	
}