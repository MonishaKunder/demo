module.exports=function(req,res){		
		var obj=req.body;
		var id=obj.uniqueid;
		if(obj.status)
		  leaveRecord.find({applierId:mongoose.Types.ObjectId(id),status:obj.status},function(err,result){
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
				res.json({
						statusCode:200,
						err:null,
						data:result
					})
			
		}).sort({from:-1})
		else
			leaveRecord.find({applierId:mongoose.Types.ObjectId(id)},function(err,result){
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
				if(result.length!=0)
					res.json({
						statusCode:200,
						err:null,
						data:result
					})
				else
					res.sendStatus(404)
					
			
		}).sort({from:-1})
	}