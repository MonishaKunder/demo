
require('../schema');
var mongoose = require('mongoose');

module.exports=function(req,res){	
		var obj=req.query;
		var id=req.headers['uniqueid'];
		/*
		if(obj.status)
		  leaveRecord.find({applierId:mongoose.Types.ObjectId(id),status:obj.status},function(err,result){
			if(err)
				{
					res.json({
						status:"failure",
						err:err,
						data:null
					})
					console.log(err)
				}
			else
				res.json({
						status:"success",
						err:null,
						data:result
					})
			
		}).sort({from:-1})
		else
			*/
			leaveRecord.find({'applierId.id':id},function(err,result){
			if(err)
				{
					res.json({
						status:"failure",
						err:err,
						data:null
					})
					console.log(err)
				}
			else
				if(result.length!=0)
					res.json({
						status:"success",
						err:null,
						data:result
					})
				else
					res.sendStatus(404)
					
			
		}).sort({from:-1})
	}