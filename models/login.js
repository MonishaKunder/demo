require('../schema.js')
module.exports=function(req,res) {
	var obj=req.body;
	user.findOne({username:obj.username},{_id:1,password:1},function(err,result){
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
		{
			if(result.password)
			{
				if(result.password==obj.password)
				{
					res.json({
						status:"success",
						err:null,
						data:{
							uniqueid:result._id
						}
					})
				}
				else
				{
					res.json({
						status:"failure",
						err:"Inavlid username or password",
						data:null
					})
				}
			}
			else
			{
				res.json({
					status:"failure",
					err:"Inavlid username or password",
					data:null
				})
			}
		}
	})
}
