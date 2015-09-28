//new Date('Oct 6,2015'),new Date('Oct 7,2015'),new Date('Oct 19,2015')
var critical=[]
module.exports=function(app,opt,schema){
  var holiday=schema.holiday;
  var user=schema.user;
  app.get('/vacationPlanner',function(req,res){
    var obj=req.query;
    var start=new Date(obj.start)
    var end=new Date(obj.end)
    var noOfDays=obj.noOfDays;
    var firstday=start.getDay();
    var dateArray=[]
    var weekend=new Date(start);
    if(firstday==0)
    {
      weekend.setDate(start.getDate())
      var newdate=new Date(weekend)
      dateArray.push(newdate)
      weekend.setDate(weekend.getDate()+6)
    }
    else
      weekend.setDate(start.getDate()+(6-firstday))

    while(weekend<=end)
     {
        var newdate=new Date(weekend)
        dateArray.push(newdate)
        weekend.setDate(weekend.getDate()+1)
        if(weekend.getTime()<=end.getTime())
        {
          var newdate=new Date(weekend)
          dateArray.push(newdate)
          weekend.setDate(weekend.getDate()+6)
        }
    
      }

      var date_sort_asc = function (date1, date2) {

        if (date1 > date2) return 1;
        if (date1 < date2) return -1;
        return 0;
      } 
      user.findById(obj.id,{location:1},
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
        holiday.find({location:doc.location,date:
        {
          $gte:start,
          $lte:end
        }},function(err,result){
          if(err)
          {
            res.json({
            statusCode:500,
            err:err,
            data:null
          })
          }
          else
          {
          for(var i=0;i<result.length;i++)
          {
            var newdate=new Date(result[i].date)
            dateArray.push(newdate)
          }
          dateArray.sort(date_sort_asc)
        
      
          var con_holiday=[];
          for(var i=0;i<dateArray.length;)
          {
            var temp1=new Object();
            temp1.days=[];
            var temp=dateArray[i].getDate()
            temp1.days.push(dateArray[i]);
            temp++
            i++;
            while(i<dateArray.length && dateArray[i].getDate()==temp)
            {
               temp1.days.push(dateArray[i]);
               i++;
               temp++
            }
            con_holiday.push(temp1)
          }
          result_holiday=[];
          var j=0;
          for(var i=0;i<con_holiday.length;i++)
          {
            var diff=noOfDays-con_holiday[i].days.length;
            var temp=new Date(con_holiday[i].days[0]);
        
            temp.setTime(temp.getTime()-(diff*1000*3600*24));
        
            for(var k=0;k<=diff;k++)
            {
         
              var cFlag=false;
              var count=0;
              var t=new Date(temp)
              for(var m =0;m<noOfDays;m++)
              {
                if(findInArray(critical,t) || t.getTime()>end.getTime() || t.getTime()<start.getTime())
                {
                  cFlag=true;
                  break;
                }
                if(!findInArray(dateArray,t))
                  count++;
            
                  t.setDate(t.getDate()+1)
              }
              if(!cFlag && !findInResult(result_holiday,temp))
              {
                result_holiday[j]=new Object()
                result_holiday[j].sDate=new Date(temp);;
                result_holiday[j++].leaves=count;}
                temp.setDate(temp.getDate()+1);
              }
            }
            result_holiday.sort(function(a,b){
              if(a.leaves>b.leaves) return 1;
              if(a.leaves<b.leaves) return -1;
              return 0;
            })
      
            if(result_holiday[0])
            {
              var r=result_holiday[0].leaves
              var i=0;
        
              res.json({
                statusCode:200,
                err:null,
                data:result_holiday[0]
              })
            }
            else
            {
              res.json({
                statusCode:200,
                err:null,
                data:"You can't take leave"
              })
            }
          }
  })
  })
})
}




function findInArray(arr,d)
{
	for(var i=0;i<arr.length;i++)
	{
		if(d.getDate()==arr[i].getDate() && d.getMonth()==arr[i].getMonth() && d.getFullYear()==arr[i].getFullYear())
			return(true);
	}

	return(false)
}

function findInResult(arr,d)
{
  for(var i=0;i<arr.length;i++)
  {
    if(d.getDate()==arr[i].sDate.getDate() && d.getMonth()==arr[i].sDate.getMonth() && d.getFullYear()==arr[i].sDate.getFullYear())
      return(true);
  }

  return(false)
}
      




