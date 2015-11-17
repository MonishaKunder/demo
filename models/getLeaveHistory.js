
require('../schema');

module.exports=function(req,res){	
		var obj=req.query;
		var id=req.headers['uniqueid'];
		
		leaveRecord.find({'applier.id':id},function(err,result){
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
					
			
		}).sort({from:1})
	}