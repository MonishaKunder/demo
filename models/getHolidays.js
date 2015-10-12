require('../schema');

module.exports=function(req,res) {
	var userid = req.body.uniqueid    
    user.findById(userid,{'organizationaldata.location':1},
			function(err,doc){
				if(err)
				{
					console.log(err)
					res.json({
						statusCode:500,
						error:err,
						data:null
					})
					
				}
				else
					holiday.find({location:doc.organizationaldata.location},function(err,docs){
						if(err)
						{
							console.log(err)
							res.json({
								statusCode:500,
								error:err,
								data:null
							})
						}
						else
						{
							if(docs.length!=0)
								res.json({
									statusCode:200,
									error:null,
									data:docs
								})
							else
								res.sendStatus(404)

						}
				        
					}).sort({date:1})
				})
}
