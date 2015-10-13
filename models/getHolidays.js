require('../schema');

module.exports=function(req,res) {
	var userid = req.headers['uniqueid']   
    user.findById(userid,{'organizationaldata.location':1},
			function(err,doc){
				if(err)
				{
					console.log(err)
					res.json({
						status:"failure",
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
								status:"failure",
								error:err,
								data:null
							})
						}
						else
						{
							if(docs.length!=0)
								res.json({
									status:"success",
									error:null,
									data:docs
								})
							else
								res.sendStatus(404)

						}
				        
					}).sort({date:1})
				})
}
