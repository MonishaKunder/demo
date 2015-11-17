var async=require('async')
var mongoose=require('mongoose')
require('../schema');

module.exports=function(req,res){
	
	var obj=req.body;
	var id=req.headers.uniqueid;
	var days;
	var halfdays=0;
	var dFrom=obj.from.split('-');
	var dTo=obj.to.split('-');
		
 	if(obj.reason!='' && obj.reason!=undefined){
		if(obj.fromSession=='Session 1'||obj.fromSession=='Session 2') {
			halfdays += 0.5;
		}
		if(obj.toSession=='Session 1'||obj.toSession=='Session 2') {
			halfdays += 0.5;
		}


		days=(new Date(dTo[0],dTo[1]-1,dTo[2])- new Date(dFrom[0],dFrom[1]-1,dFrom[2]))/(3600*24*1000)+1;
		
		days -= halfdays;
		
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
				user.findOne({'personaldata.employee id':doc.organizationaldata.manager},function(err,manager){
					if(err)
						callback(err)
					else
						callback(null,doc,manager)
				})
			},
			function(doc,manager,callback){
				console.log(manager);
				var lObj={
					appliedOn:new Date(Date.now()),
					from: {day : new Date(obj.from).toISOString(),session:obj.fromSession},
					to: {day : new Date(obj.to).toISOString(),session:obj.toSession},
					type:obj.type,
					halfDay:obj.halfday,
					applier:{displayName:doc.personaldata['first name']+" "+doc.personaldata['last name'],
								email:doc.username,
								id:id,
								avatartUrl:""},
					approver:{displayName:manager.personaldata['first name']+" "+manager.personaldata['last name'],
								email:manager.username,
								id:manager.personaldata['employee id'],
								avatartUrl:""},
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
	else
	{
		res.json({
			status:"failure",
			err:"Reason is not specified",
			data:null
		})
	}
}