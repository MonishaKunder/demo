var async=require('async')
var mongoose=require('mongoose')
module.exports=function(req,res){
	var obj=req.query;
		var id=obj.id;

		async.waterfall([
			function(callback){
				leaveType.find({},function(err,result){
					if(err)
						callback(err)
					else
						callback(null,result);
				})
			},
			function(docs,callback)
			{ 
				var total_leaves={};
				var total_count=0;
				var total_availed=0;
				leaveRecord.aggregate([
					{$match:{applierId:mongoose.Types.ObjectId(id),status:"approved"}},
					{$group:{_id:"$type",availed:{$sum:"$noOfDays"}}}
				],function(err,result){
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
						var category=[];
						for(var i=0;i<docs.length;i++)
						{
								total_count+=docs[i].count;
								var o={};
								o['type']=docs[i].name;
								o['total']=docs[i].count;
								function availedCount(type){
									for(var i=0;i<result.length;i++)
									{
										if(result[i]._id==type)
											return result[i].availed;
									}
									return 0;
								}
								o['availed']=availedCount(docs[i].name);
								var t=o['total']-o['availed'];
								o['available']=t;
								
								total_availed+=o['availed']
								category.push(o);
							
						}
						var t=total_count-total_availed;
					    var data1={
					    	'total':total_count,
					    	'availed':total_availed,
					    	'available':t,
					    	'category':category
					    }
						
						res.json({
							statusCode:200,
							err:null,
							data:data1
						})
					}
					callback();

				})
			}],
			function(err,result){
				if(err)
					console.log(err)
			})
}