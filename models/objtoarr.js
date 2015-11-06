

module.exports = function(req,res,obj,blah) {
  var tosend = {};
  /*
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      console.log(key);
    }
  }
  */
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(key=='personaldata') {
        var personaldata = new Array();
        var personaldataobj = Object.keys(obj[key]);
        for(var i =0;i<personaldataobj.length;i++) {
          personaldata.push({title:personaldataobj[i],value:obj.personaldata[personaldataobj[i]]});
        }
        tosend.personaldata = personaldata;
      }
       if(key=='organizationaldata') {
        var organizationaldata = new Array();
        var organizationaldataobj = Object.keys(obj[key]);
        for(var i =0;i<organizationaldataobj.length;i++) {
          organizationaldata.push({title:organizationaldataobj[i],value:obj.organizationaldata[organizationaldataobj[i]]});
        }
        tosend.organizationaldata = organizationaldata;
      }
       if(key=='emergencycontact') {
        var emergencycontact = new Array();
        var emergencycontactobj = Object.keys(obj[key]);
        for(var i =0;i<emergencycontactobj.length;i++) {
          emergencycontact.push({title:emergencycontactobj[i],value:obj.emergencycontact[emergencycontactobj[i]]});
        }
        tosend.emergencycontact = emergencycontact;
      }

       if(key=='address') {
        var address = new Array();
        var addressobj = Object.keys(obj[key]);
        console.log(addressobj)
        for(var i =0;i<addressobj.length;i++) {
          address.push({title:addressobj[i],value:obj.address[addressobj[i]]});
        }
        tosend.address = address;
      }

    }
  }
  if(blah=='profile') {

    tosend.familydetails = [];
    tosend.eventdetails = [];
    tosend.userid = obj.userid;
  }
  if(blah=='searchinfo') {

    tosend.familydetails = [];
    tosend.eventdetails = [];
    tosend.emergencycontact = [];
    tosend.userid = obj.userid;
  }
  res.json(tosend);

}

