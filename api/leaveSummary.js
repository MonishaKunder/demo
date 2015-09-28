
var async=require('async')
module.exports=function(app,opt,schema){
	app.get('/leaveSummary',function(req,res){
		var leaveRecord=schema.leaveRecord;
		var user=schema.user;
		var obj=req.query;
		var id=obj.id;
		var mongoose=opt.mongoose;

		async.parallel([
			function(callback){
				user.findById(id,{leaves:1,_id:0},function(err,result){
						if(err)
							callback(err)
						else
							callback(null,result)
					})
			},
			function(callback){
				leaveRecord.aggregate([
					{$match:{applierId:mongoose.Types.ObjectId(id),status:"approved"}},
					{$group:{_id:"$type",noOfLeaves:{$sum:"$noOfDays"}}}
					],function(err,result){
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
					res.json({
						statusCode:200,
						err:null,
						data:{
							total_available:result[0],
							availed:result[1]
						}
					})
				}

			})

})
	
}